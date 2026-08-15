import { useEffect, useMemo, useState } from 'react';
import LogoAnimation from './LogoAnimation';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILES = 50;
const MAX_FILE_SIZE = 30 * 1024 * 1024;
const CONCURRENT_UPLOADS = 3;

const ALLOWED_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
  'heif',
  'jfif',
  'avif',
];

function createFileId(file) {
  return `${crypto.randomUUID()}-${file.name}`;
}

function getExtension(fileName = '') {
  return fileName.split('.').pop()?.toLowerCase();
}

export default function UploadPhotos() {
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const markReady = () => setIsReady(true);

    if (document.readyState === 'complete') {
      markReady();
      return;
    }
    window.addEventListener('load', markReady, { once: true });

    return () => window.removeEventListener('load', markReady);
  }, []);

  const uploadedCount = useMemo(
    () => items.filter((item) => item.status === 'success').length,
    [items],
  );

  const failedCount = useMemo(
    () => items.filter((item) => item.status === 'error').length,
    [items],
  );

  const totalProgress = useMemo(() => {
    if (!items.length) {
      return 0;
    }

    const total = items.reduce((sum, item) => sum + item.progress, 0);

    return Math.round(total / items.length);
  }, [items]);

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [items]);

  const updateItem = (id, updates) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    );
  };

  const handleFilesSelected = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    setGeneralError('');

    if (!selectedFiles.length) {
      return;
    }

    if (items.length + selectedFiles.length > MAX_FILES) {
      setGeneralError(
        `Možete odabrati maksimalno ${MAX_FILES} fotografija odjednom.`,
      );

      event.target.value = '';
      return;
    }

    const newItems = [];

    for (const file of selectedFiles) {
      const extension = getExtension(file.name);

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        setGeneralError(`Format ${file.name} nije dozvoljen.`);

        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setGeneralError(`${file.name} je veća od 30 MB.`);

        continue;
      }

      newItems.push({
        id: createFileId(file),
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: 'waiting',
        error: '',
      });
    }

    setItems((current) => [...current, ...newItems]);

    event.target.value = '';
  };

  const removeItem = (id) => {
    if (uploading) {
      return;
    }

    setItems((current) => {
      const item = current.find((item) => item.id === id);

      if (item) {
        URL.revokeObjectURL(item.previewUrl);
      }

      return current.filter((item) => item.id !== id);
    });
  };

  const requestUploadUrl = async (file) => {
    const response = await fetch('/api/r2-upload-url', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Nije moguće pripremiti upload.');
    }

    return data;
  };

  const uploadToR2 = (uploadUrl, item) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', uploadUrl);

      xhr.setRequestHeader(
        'Content-Type',
        item.file.type || 'application/octet-stream',
      );

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          return;
        }

        const percentage = Math.round((event.loaded / event.total) * 100);

        updateItem(item.id, {
          progress: percentage,
        });
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            etag: xhr.getResponseHeader('ETag'),
          });

          return;
        }

        reject(new Error(`Upload nije uspio. Status: ${xhr.status}`));
      };

      xhr.onerror = () => {
        reject(new Error('Greška prilikom slanja fotografije.'));
      };

      xhr.send(item.file);
    });
  };

  const uploadSingleItem = async (item) => {
    try {
      updateItem(item.id, {
        status: 'uploading',
        progress: 0,
        error: '',
      });

      const { uploadUrl, fileKey } = await requestUploadUrl(item.file);

      await uploadToR2(uploadUrl, item);

      updateItem(item.id, {
        status: 'success',
        progress: 100,
        fileKey,
        error: '',
      });
    } catch (error) {
      console.error(`Upload failed: ${item.file.name}`, error);

      updateItem(item.id, {
        status: 'error',
        error: error.message,
      });
    }
  };

  const runUploadQueue = async (queue) => {
    let currentIndex = 0;

    async function worker() {
      while (currentIndex < queue.length) {
        const index = currentIndex++;

        const item = queue[index];

        await uploadSingleItem(item);
      }
    }

    const workers = Array.from(
      {
        length: Math.min(CONCURRENT_UPLOADS, queue.length),
      },
      () => worker(),
    );

    await Promise.all(workers);
  };

  const handleUpload = async () => {
    const queue = items.filter(
      (item) => item.status === 'waiting' || item.status === 'error',
    );

    if (!queue.length) {
      return;
    }

    setUploading(true);
    setGeneralError('');

    try {
      await runUploadQueue(queue);
    } finally {
      setUploading(false);
    }
  };

  const retryFailed = async () => {
    const failed = items.filter((item) => item.status === 'error');

    if (!failed.length) {
      return;
    }

    setUploading(true);

    try {
      await runUploadQueue(failed);
    } finally {
      setUploading(false);
    }
  };

  const clearSuccessful = () => {
    if (uploading) {
      return;
    }

    setItems((current) => {
      current
        .filter((item) => item.status === 'success')
        .forEach((item) => {
          URL.revokeObjectURL(item.previewUrl);
        });

      return current.filter((item) => item.status !== 'success');
    });
  };

  return (
    <AnimatePresence mode='wait'>
      {showLoader ? (
        <motion.div
          key='logo'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className='fixed inset-0'
        >
          <LogoAnimation
            canFinish={isReady}
            onComplete={() => setShowLoader(false)}
          />
        </motion.div>
      ) : (
        <motion.div
          key='content'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className='relative inset-0'
        >
          <div className='bg-beige-1 h-dvh flex flex-col p-5'>
            <div className='min-h-[32vh]'>
              <h1 className='text-3xl caligraphy text-center leading-6'>
                Uhvatite trenutak <br></br>podijelite uspomenu
              </h1>

              <p className='mt-3 text-center'>
                Možete odabrati više fotografija odjednom.
              </p>

              <label className='mt-8 flex flex-col cursor-pointer border border-beige-6 rounded-2xl items-center justify-center gap-3 w-30 h-30 mx-auto bg-white'>
                <span className='text-6xl text-beige-6 leading-5 opacity-70'>
                  +
                </span>
                <span className='text-center leading-4'>
                  Odaberi fotografije
                </span>

                <input
                  type='file'
                  accept='image/*'
                  multiple
                  disabled={uploading}
                  onChange={handleFilesSelected}
                  className='hidden'
                />
              </label>
            </div>

            {generalError && <p className='mt-4'>{generalError}</p>}

            {items.length > 0 && (
              <>
                <div className='mt-6 flex items-center justify-between gap-4'>
                  <p>Odabrano: {items.length}</p>

                  <p>
                    Poslano: {uploadedCount}/{items.length}
                  </p>
                </div>

                <div className='mt-1'>
                  <div className='mt-1 h-3 w-full overflow-hidden rounded-lg border border-beige-6 bg-transparent'>
                    <div
                      className='h-full bg-green-500/50 transition-[width] duration-300 ease-out'
                      style={{ width: `${totalProgress}%` }}
                    ></div>
                  </div>

                  <p className='mt-1'>Ukupni upload: {totalProgress}%</p>
                </div>

                <div className='mt-8 grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 max-h-[34vh] overflow-y-auto'>
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className='relative animate-fade-in-up'
                    >
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className='aspect-square w-full rounded-xl object-cover'
                      />

                      {!uploading && item.status !== 'success' && (
                        <button
                          type='button'
                          onClick={() => removeItem(item.id)}
                          className='absolute right-2 top-2 text-4xl text-red-500 leading-4'
                        >
                          ×
                        </button>
                      )}

                      <p className='mt-2 truncate text-sm '>{item.file.name}</p>

                      <div className='mt-1 h-3 w-full overflow-hidden rounded-lg border border-beige-6 bg-transparent'>
                        <div
                          className='h-full bg-green-500/50 transition-[width] duration-300 ease-out'
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>

                      <p className='text-sm'>{item.progress}%</p>

                      {item.status === 'waiting' && (
                        <p className='animate-fade-in-up'>Na čekanju</p>
                      )}

                      {item.status === 'uploading' && (
                        <p className='animate-fade-in-up'>Šaljem...</p>
                      )}

                      {item.status === 'success' && (
                        <p className='animate-fade-in-up'>Poslano ✓</p>
                      )}

                      {item.status === 'error' && <p>Greška: {item.error}</p>}
                    </article>
                  ))}
                </div>
                <div className='mt-8 flex flex-wrap gap-2 justify-center'>
                  <button
                    type='button'
                    onClick={handleUpload}
                    disabled={
                      uploading ||
                      items.every((item) => item.status === 'success')
                    }
                    className='text-beige-7 flex mx-auto border border-beige-6 px-10 py-1 rounded-md text-xl'
                  >
                    {uploading ? 'Šaljem...' : `Pošalji fotografije`}
                  </button>

                  {failedCount > 0 && (
                    <button
                      type='button'
                      onClick={retryFailed}
                      disabled={uploading}
                    >
                      Pokušaj ponovo ({failedCount})
                    </button>
                  )}

                  {uploadedCount > 0 && (
                    <button
                      type='button'
                      onClick={clearSuccessful}
                      disabled={uploading}
                      className='text-center'
                    >
                      Ukloni poslane fotografije
                    </button>
                  )}
                </div>
                {!uploading &&
                  uploadedCount === items.length &&
                  items.length > 0 && (
                    <p className='mt-8 text-lg text-center leading-5'>
                      Sve fotografije su uspješno poslane.<br></br>Hvala Vam!
                    </p>
                  )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

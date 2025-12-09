const FILE_FORMATS = ['jpeg', 'jpg', 'png', 'webp']

export const VALID_FILE_FORMATS = {
   labels: FILE_FORMATS.join(', ').toUpperCase(),
   values: FILE_FORMATS.map(format => `image/${format}`),
}

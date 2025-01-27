const { R2 } = require('@cloudflare/storage');

const r2 = new R2({
    accountId: 'your-cloudflare-account-id',
    accessKeyId: 'your-access-key',
    secretAccessKey: 'your-secret-key',
    region: 'your-region',
    bucketName: 'your-r2-bucket-name'
});

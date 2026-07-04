# Deployment Notes

## Current Server

- Public IP: `118.31.109.73`
- Static root: `/var/www/jisutech.space`
- Static service: system Nginx on `127.0.0.1:8088` and `172.17.0.1:8088`
- Public proxy: Docker container `nginx-app` using Nginx Proxy Manager

## Files

- `nginx-jisutech-local.conf`: system Nginx static site config.
- `npm-proxy-host-3.conf`: Nginx Proxy Manager proxy host config for `jisutech.space` and `www.jisutech.space`.

## Update Static Files

Upload these files to `/var/www/jisutech.space`:

- `index.html`
- `styles.css`
- `app.js`
- `favicon.svg`
- `assets/`

Then ensure directories are readable by Nginx:

```bash
chown -R root:root /var/www/jisutech.space
chmod 755 /var/www /var/www/jisutech.space
find /var/www/jisutech.space -type d -exec chmod 755 {} \;
find /var/www/jisutech.space -type f -exec chmod 644 {} \;
```

## GitHub Actions Auto Deploy

The repository includes `.github/workflows/deploy.yml`.

Required repository secrets:

- `DEPLOY_HOST`: `118.31.109.73`
- `DEPLOY_USER`: `jisutech-deploy`
- `DEPLOY_SSH_KEY`: private key content for the server deploy user

After these secrets are configured, every push to `main` runs `npm test` and syncs the static files to `/var/www/jisutech.space`.

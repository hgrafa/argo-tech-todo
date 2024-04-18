FROM php:8.2

RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www/html

COPY . .

# Create the cache directory
RUN mkdir -p /var/www/html/cache

# Change ownership of directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/cache

CMD php artisan serve --host=0.0.0.0 --port=8000

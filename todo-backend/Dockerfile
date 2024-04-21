FROM php:8.2

RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    curl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www/html

COPY . .

RUN composer install

RUN mkdir -p /var/www/html/cache

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/cache

CMD php artisan l5-swagger:generate && \
    php artisan serve --host=0.0.0.0 --port=8000

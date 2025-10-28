# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Install dependencies
RUN apt-get update && apt-get install -y unzip git curl

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Allow .htaccess overrides
RUN sed -i 's|AllowOverride None|AllowOverride All|g' /etc/apache2/apache2.conf

# Set working directory
WORKDIR /var/www/html

# Copy project files into container
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader

# Set Apache DocumentRoot to public/
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Set ownership for Apache
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

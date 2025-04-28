document.addEventListener('DOMContentLoaded', function() {
    // Elementos del filtro de precios
    const priceSlider = document.getElementById('priceRange');
    const minPriceInput = document.querySelector('.price-inputs input:first-child');
    const maxPriceInput = document.querySelector('.price-inputs input:last-child');
    
    // Valores iniciales
    const minPrice = 0;
    const maxPrice = 2000;
    
    // Configurar valores iniciales
    priceSlider.min = minPrice;
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice / 2; // Valor inicial del slider
    
    minPriceInput.value = minPrice;
    maxPriceInput.value = maxPrice / 2;
    
    // Actualizar el valor máximo cuando se mueve el slider
    priceSlider.addEventListener('input', function() {
        // Actualizar el campo de entrada máximo
        maxPriceInput.value = this.value;
        
        // Asegurarse de que el valor mínimo no sea mayor que el máximo
        if (parseInt(minPriceInput.value) > parseInt(this.value)) {
            minPriceInput.value = this.value;
        }
        
        // Actualizar el estilo del slider para mostrar el rango seleccionado
        updateSliderStyle();
    });
    
    // Actualizar el slider cuando se cambia el valor mínimo manualmente
    minPriceInput.addEventListener('change', function() {
        // Asegurarse de que el valor esté dentro del rango permitido
        if (parseInt(this.value) < minPrice) {
            this.value = minPrice;
        }
        
        // Asegurarse de que el valor mínimo no sea mayor que el máximo
        if (parseInt(this.value) > parseInt(maxPriceInput.value)) {
            this.value = maxPriceInput.value;
        }
        
        // Actualizar el estilo del slider
        updateSliderStyle();
    });
    
    // Actualizar el slider cuando se cambia el valor máximo manualmente
    maxPriceInput.addEventListener('change', function() {
        // Asegurarse de que el valor esté dentro del rango permitido
        if (parseInt(this.value) > maxPrice) {
            this.value = maxPrice;
        }
        
        // Asegurarse de que el valor máximo no sea menor que el mínimo
        if (parseInt(this.value) < parseInt(minPriceInput.value)) {
            this.value = minPriceInput.value;
        }
        
        // Actualizar el valor del slider
        priceSlider.value = this.value;
        
        // Actualizar el estilo del slider
        updateSliderStyle();
    });
    
    // Función para actualizar el estilo del slider
    function updateSliderStyle() {
        const percent = ((priceSlider.value - minPrice) / (maxPrice - minPrice)) * 100;
        priceSlider.style.background = `linear-gradient(to right, #e83e8c 0%, #e83e8c ${percent}%, #555 ${percent}%, #555 100%)`;
    }
    
    // Inicializar el estilo del slider
    updateSliderStyle();
    
    // Botón para aplicar filtros
    const applyFiltersBtn = document.querySelector('.apply-filters');
    applyFiltersBtn.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para aplicar los filtros
        console.log(`Filtro de precio aplicado: $${minPriceInput.value} - $${maxPriceInput.value}`);
        // Ejemplo: recargar productos filtrados
        // fetchFilteredProducts(minPriceInput.value, maxPriceInput.value);
    });
    
    // Botón para limpiar filtros
    const clearFiltersBtn = document.querySelector('.clear-filters');
    clearFiltersBtn.addEventListener('click', function() {
        // Restablecer valores
        priceSlider.value = maxPrice / 2;
        minPriceInput.value = minPrice;
        maxPriceInput.value = maxPrice / 2;
        
        // Desmarcar todas las casillas de verificación
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Actualizar el estilo del slider
        updateSliderStyle();
        
        console.log('Filtros limpiados');
    });
});
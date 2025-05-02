
        document.addEventListener('DOMContentLoaded', function() {
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.parentElement;
                    const arrow = question.querySelector('.arrow-icon i');
                    
                    // Cierra todos los otros items
                    document.querySelectorAll('.faq-item').forEach(item => {
                        if (item !== faqItem && item.classList.contains('active')) {
                            item.classList.remove('active');
                            item.querySelector('.arrow-icon i').classList.remove('rotate');
                        }
                    });
                    
                    // Toggle del item actual
                    faqItem.classList.toggle('active');
                    arrow.classList.toggle('rotate');
                });
            });
        });
 
document.addEventListener('DOMContentLoaded', function() {
    // Quiz functionality
    const quizForm = document.getElementById('dosha-quiz');
    
    if (!quizForm) return; // Exit if not on the quiz page
    
    const questions = document.querySelectorAll('.question-slide');
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    let currentQuestionIndex = 0;
    const totalQuestions = questions.length - 1; // Excluding the results slide
    
    // Set total questions in the counter
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = totalQuestions;
    }
    
    // Initialize progress bar
    updateProgressBar();
    
    // Next button functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const currentQuestion = questions[currentQuestionIndex];
            const selectedAnswer = currentQuestion.querySelector('input[type="radio"]:checked');
            
            // Require an answer before proceeding
            if (!selectedAnswer) {
                alert('Please select an answer before proceeding.');
                return;
            }
            
            // Move to next question
            currentQuestionIndex++;
            
            // Show/hide navigation buttons based on position
            updateNavigationButtons();
            
            // Update progress bar
            updateProgressBar();
            
            // Show current question, hide others
            updateQuestionDisplay();
        });
    }
    
    // Previous button functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentQuestionIndex--;
            
            // Show/hide navigation buttons based on position
            updateNavigationButtons();
            
            // Update progress bar
            updateProgressBar();
            
            // Show current question, hide others
            updateQuestionDisplay();
        });
    }
    
    // Submit button functionality
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            calculateResults();
        });
    }
    
    // Retake quiz button
    const retakeBtn = document.getElementById('retake-quiz');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', function() {
            // Reset form
            quizForm.reset();
            
            // Go back to first question
            currentQuestionIndex = 0;
            
            // Update UI
            updateNavigationButtons();
            updateProgressBar();
            updateQuestionDisplay();
        });
    }
    
    function updateNavigationButtons() {
        // Enable/disable previous button
        if (prevBtn) {
            prevBtn.disabled = currentQuestionIndex === 0;
        }
        
        // Show/hide next and submit buttons
        if (nextBtn && submitBtn) {
            if (currentQuestionIndex === totalQuestions - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }
    }
    
    function updateProgressBar() {
        if (progressFill && currentQuestionIndex < totalQuestions) {
            const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
            progressFill.style.width = `${progressPercent}%`;
            
            if (currentQuestionEl) {
                currentQuestionEl.textContent = currentQuestionIndex + 1;
            }
        }
    }
    
    function updateQuestionDisplay() {
        questions.forEach((question, index) => {
            if (index === currentQuestionIndex) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
    }
    
    function calculateResults() {
        // Count scores for each dosha
        let vataScore = 0;
        let pittaScore = 0;
        let kaphaScore = 0;
        
        // Get all answered questions
        const answers = quizForm.querySelectorAll('input[type="radio"]:checked');
        
        // Count each dosha selection
        answers.forEach(answer => {
            if (answer.value === 'vata') vataScore++;
            if (answer.value === 'pitta') pittaScore++;
            if (answer.value === 'kapha') kaphaScore++;
        });
        
        // Calculate percentages
        const totalAnswers = answers.length;
        const vataPercent = Math.round((vataScore / totalAnswers) * 100);
        const pittaPercent = Math.round((pittaScore / totalAnswers) * 100);
        const kaphaPercent = Math.round((kaphaScore / totalAnswers) * 100);
        
        // Update the result meters
        document.querySelector('.vata-fill').style.width = `${vataPercent}%`;
        document.querySelector('.pitta-fill').style.width = `${pittaPercent}%`;
        document.querySelector('.kapha-fill').style.width = `${kaphaPercent}%`;
        
        // Update percentage text
        document.querySelectorAll('.meter-percent')[0].textContent = `${vataPercent}%`;
        document.querySelectorAll('.meter-percent')[1].textContent = `${pittaPercent}%`;
        document.querySelectorAll('.meter-percent')[2].textContent = `${kaphaPercent}%`;
        
        // Determine primary dosha
        let primaryDosha = 'Balanced';
        let primaryPercent = 0;
        
        if (vataPercent > primaryPercent) {
            primaryDosha = 'Vata';
            primaryPercent = vataPercent;
        }
        if (pittaPercent > primaryPercent) {
            primaryDosha = 'Pitta';
            primaryPercent = pittaPercent;
        }
        if (kaphaPercent > primaryPercent) {
            primaryDosha = 'Kapha';
            primaryPercent = kaphaPercent;
        }
        
        // Update primary dosha text
        const primaryDoshaEl = document.getElementById('primary-dosha-result');
        const doshaDescriptionEl = document.getElementById('dosha-description');
        
        if (primaryDoshaEl) {
            primaryDoshaEl.textContent = primaryDosha;
        }
        
        // Set description based on primary dosha
        if (doshaDescriptionEl) {
            switch(primaryDosha) {
                case 'Vata':
                    doshaDescriptionEl.textContent = 'Vata skin tends to be dry, thin, and delicate with fine pores. Your skin benefits from rich, nourishing oils and creams that provide deep hydration and protection.';
                    break;
                case 'Pitta':
                    doshaDescriptionEl.textContent = 'Pitta skin tends to be sensitive, warm, and prone to redness with medium pores. Your skin benefits from cooling, soothing ingredients that calm irritation and reduce inflammation.';
                    break;
                case 'Kapha':
                    doshaDescriptionEl.textContent = 'Kapha skin tends to be oily, thick, and smooth with larger pores. Your skin benefits from lightweight, stimulating formulations that balance oil production and improve circulation.';
                    break;
                default:
                    doshaDescriptionEl.textContent = 'You have a balanced constitution with no strongly dominant dosha. Your skin can benefit from products that maintain this natural balance.';
            }
        }
        
        // Show recommended products based on dosha
        const recommendationsContainer = document.querySelector('.product-recommendations');
        if (recommendationsContainer) {
            recommendationsContainer.innerHTML = ''; // Clear previous recommendations
            
            // Add product recommendations based on primary dosha
            const products = getRecommendedProducts(primaryDosha);
            
            products.forEach(product => {
                const productEl = document.createElement('div');
                productEl.className = 'recommended-product';
                productEl.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h5>${product.name}</h5>
                        <p>${product.description}</p>
                    </div>
                `;
                recommendationsContainer.appendChild(productEl);
            });
        }
        
        // Show results slide
        questions.forEach(q => q.classList.remove('active'));
        document.querySelector('[data-question="results"]').classList.add('active');
    }
    
    function getRecommendedProducts(dosha) {
        // Return product recommendations based on dosha
        switch(dosha) {
            case 'Vata':
                return [
                    {
                        name: 'Shatavari Night Cream',
                        description: 'Nourishing cream for dry skin',
                        image: 'images/product-4.jpg'
                    },
                    {
                        name: 'Amla & Argan Hair Mask',
                        description: 'Deep conditioning for dry hair',
                        image: 'images/product-8.jpg'
                    },
                    {
                        name: 'Kumkumadi Face Oil',
                        description: 'Brightening elixir with saffron & 25 herbs',
                        image: 'images/product-1.jpg'
                    }
                ];
            case 'Pitta':
                return [
                    {
                        name: 'Rose & Neem Face Wash',
                        description: 'Gentle cleanser for balanced skin',
                        image: 'images/product-2.jpg'
                    },
                    {
                        name: 'Sandalwood & Turmeric Mask',
                        description: 'Cooling mask for sensitive skin',
                        image: 'images/product-5.jpg'
                    },
                    {
                        name: 'Kumkumadi Face Oil',
                        description: 'Brightening elixir with saffron & 25 herbs',
                        image: 'images/product-1.jpg'
                    }
                ];
            case 'Kapha':
                return [
                    {
                        name: 'Manjistha Body Oil',
                        description: 'Detoxifying massage oil for clear skin',
                        image: 'images/product-3.jpg'
                    },
                    {
                        name: 'Ginger & Cedar Body Scrub',
                        description: 'Warming scrub for circulation',
                        image: 'images/product-6.jpg'
                    },
                    {
                        name: 'Triphala Powder',
                        description: 'Detoxifying herb for inner radiance',
                        image: 'images/product-9.jpg'
                    }
                ];
            default:
                return [
                    {
                        name: 'Kumkumadi Face Oil',
                        description: 'Brightening elixir with saffron & 25 herbs',
                        image: 'images/product-1.jpg'
                    },
                    {
                        name: 'Bhringraj Hair Oil',
                        description: 'Strengthening oil for hair growth',
                        image: 'images/product-7.jpg'
                    },
                    {
                        name: 'Triphala Powder',
                        description: 'Detoxifying herb for inner radiance',
                        image: 'images/product-9.jpg'
                    }
                ];
        }
    }
}); 
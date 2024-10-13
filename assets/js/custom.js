$(document).ready(function() {
    "use strict";

    /*-------------------------------------
            1. Scroll To Top 
    --------------------------------------*/
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.return-to-top').fadeIn();
        } else {
            $('.return-to-top').fadeOut();
        }
    });

    $('.return-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    /*-------------------------------------
            2. Smooth Scroll spy
    --------------------------------------*/
    $('.header-area').sticky({ topSpacing: 0 });

    $('li.smooth-menu a').bind("click", function(event) {
        event.preventDefault();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 75
        }, 1200, 'easeInOutExpo');
        window.userClicked = true;
    });

    $(window).scroll(function() {
        if (window.userClicked) {
            setTimeout(function() {
                $('.navbar-collapse ul li').removeClass('active');
                $('body').scrollspy('refresh');
                window.userClicked = false;
            }, 50);
        }
    });

    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 75
    });

    /*-------------------------------------
            3. Progress-bar
    --------------------------------------*/
    var dataToggleTooTip = $('[data-toggle="tooltip"]');
    var progressBar = $(".progress-bar");
    if (progressBar.length) {
        progressBar.appear(function() {
            dataToggleTooTip.tooltip({
                trigger: 'manual'
            }).tooltip('show');
            progressBar.each(function() {
                var each_bar_width = $(this).attr('aria-valuenow');
                $(this).width(each_bar_width + '%');
            });
        });
    }

    /*-------------------------------------
            4. Welcome animation support
    --------------------------------------*/
    var h2 = $(".header-text h2");
    var objectif = $("#objectif");
    var duree = $("#duree");
    var button = $(".header-text a");
    var h2Contents = h2.contents();

    objectif.css('opacity', '0');
    duree.css('opacity', '0');
    button.css('opacity', '0');

    function typeText(element, contentArray, index, callback) {
        if (index < contentArray.length) {
            var currentItem = contentArray[index];
            if (currentItem.nodeType === 3) {
                var textArray = currentItem.nodeValue.split('');
                animateText(element, textArray, 0, function() {
                    typeText(element, contentArray, index + 1, callback);
                });
            } else if (currentItem.nodeType === 1) {
                var newElement = $(currentItem).clone().empty();
                element.append(newElement);
                var childContents = $(currentItem).contents().toArray();
                if (childContents.length > 0) {
                    typeText(newElement, childContents, 0, function() {
                        typeText(element, contentArray, index + 1, callback);
                    });
                } else {
                    typeText(element, contentArray, index + 1, callback);
                }
            }
        } else if (typeof callback == 'function') {
            callback();
        }
    }

    function animateText(element, textArray, textIndex, callback) {
        if (textIndex < textArray.length) {
            element.append(textArray[textIndex++]);
            setTimeout(function() {
                animateText(element, textArray, textIndex, callback);
            }, 100);
        } else if (typeof callback == 'function') {
            callback();
        }
    }

    h2.empty();
    typeText(h2, h2Contents.toArray(), 0, function() {
        objectif.animate({ opacity: 1 }, 1000, function() {
            duree.animate({ opacity: 1 }, 1000, function() {
                button.animate({ opacity: 1 }, 1000);
            });
        });
    });

    /*-------------------------------------
            5. Contact submission
    --------------------------------------*/
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            document.getElementById('form-feedback').textContent = "Veuillez remplir tous les champs requis";
            document.getElementById('form-feedback').style.color = "red";
            return;
        }
        const formData = new FormData(form);
        form.reset();
        fetch('https://formspree.io/f/mrbggpld', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) {
            if (response.ok) {
                document.getElementById('form-feedback').textContent = "Merci ! Votre message a bien été envoyé.";
                document.getElementById('form-feedback').style.color = "green";
            } else {
                throw new Error("Erreur de soumission du formulaire.");
            }
        })
        .catch(function(error) {
            document.getElementById('form-feedback').textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
            document.getElementById('form-feedback').style.color = "red";
        });
    });

    /*-------------------------------------
            6. Skills
    --------------------------------------*/
    const skills = [
        { name: 'HTML', percentage: 75, type: 'hard' },
        { name: 'CSS', percentage: 75, type: 'hard' },
        { name: 'JavaScript', percentage: 75, type: 'hard' },
        { name: 'C++', percentage: 60, type: 'hard' },
        { name: 'Python', percentage: 60, type: 'hard' },
        { name: 'Docker', percentage: 75, type: 'hard' },
        { name: 'GitHub', percentage: 85, type: 'hard' },
        { name: 'Communication', percentage: 90, type: 'soft' },
        { name: 'Organisation', percentage: 90, type: 'soft' }
    ];

    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const col = document.createElement('div');
        col.classList.add('col-md-6');
        const singleSkillContent = document.createElement('div');
        singleSkillContent.classList.add('single-skill-content');
        const barWrapper = document.createElement('div');
        barWrapper.classList.add('barWrapper');
        const progressText = document.createElement('span');
        progressText.classList.add('progressText');
        progressText.textContent = skill.name;
        const singleProgressTxt = document.createElement('div');
        singleProgressTxt.classList.add('single-progress-txt');
        const progress = document.createElement('div');
        progress.classList.add('progress');
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.classList.add(skill.type === 'hard' ? 'hard-skill' : 'soft-skill');
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuenow', skill.percentage);
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBar.style.width = `${skill.percentage}%`;
        const percentageText = document.createElement('h3');
        percentageText.textContent = `${skill.percentage}%`;
        progress.appendChild(progressBar);
        singleProgressTxt.appendChild(progress);
        singleProgressTxt.appendChild(percentageText);
        barWrapper.appendChild(progressText);
        barWrapper.appendChild(singleProgressTxt);
        singleSkillContent.appendChild(barWrapper);
        col.appendChild(singleSkillContent);
        skillsContainer.appendChild(col);
    });
});

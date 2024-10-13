
/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. Smooth Scroll spy
3. Progress-bar
4. welcome animation support
5. Animate on scroll
6. Contact submission
======================================*/

$(document).ready(function()
{
	"use strict";

	/*-------------------------------------
			1.Scroll To Top 
	--------------------------------------*/

	$(window).on('scroll',function ()
	{
		if ($(this).scrollTop() > 600)
		{
			$('.return-to-top').fadeIn();
		}
		else
		{
			$('.return-to-top').fadeOut();
		}
	});

	$('.return-to-top').on('click',function()
	{
			$('html, body').animate({
			scrollTop: 0
		}, 1500);
		return false;
	});

	/*-------------------------------------
			2.Smooth Scroll spy
	--------------------------------------*/

	$('.header-area').sticky({topSpacing:0});

	$('li.smooth-menu a').bind("click", function(event)
	{
		event.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 75
		}, 1200,'easeInOutExpo');
		window.userClicked = true; 
	});

	$(window).scroll(function()
	{
		if (window.userClicked)
		{
			setTimeout(function()
			{
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
			3.Progress-bar
	--------------------------------------*/

	var dataToggleTooTip = $('[data-toggle="tooltip"]');
	var progressBar = $(".progress-bar");
	if (progressBar.length)
	{
		progressBar.appear(function ()
		{
			dataToggleTooTip.tooltip({
				trigger: 'manual'
			}).tooltip('show');
			progressBar.each(function ()
			{
				var each_bar_width = $(this).attr('aria-valuenow');
				$(this).width(each_bar_width + '%');
			});
		});
	}

	/*-------------------------------------
			4.Welcome animation support
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
			if (currentItem.nodeType === 3) { // Texte pur (nodeType 3)
				var textArray = currentItem.nodeValue.split('');
				animateText(element, textArray, 0, function() {
					typeText(element, contentArray, index + 1, callback);
				});
			} else if (currentItem.nodeType === 1) { // Elément HTML (nodeType 1)
				// Crée un nouvel élément et le réinsère dans le DOM
				var newElement = $(currentItem).clone();
				element.append(newElement);
				// Traite le contenu de l'élément (si c'est du texte ou contient d'autres éléments)
				var childContents = newElement.contents().toArray();
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
			}, 100); // Vitesse de l'animation
		} else if (typeof callback == 'function') {
			callback();
		}
	}
	
	// Effacer le contenu initial
	h2.empty();
	
	// Lancer l'animation de typewriter
	typeText(h2, h2Contents.toArray(), 0, function() {
		objectif.animate({opacity: 1}, 1000, function() {
			duree.animate({opacity: 1}, 1000, function() {
				button.animate({opacity: 1}, 1000);
			});
		});
	});
	
	/*-------------------------------------
			6. Contact submission
	--------------------------------------*/

	AOS.init({
		duration: 800,
		easing: 'ease-in-out',
		once: true,
		mirror: false,
		offset: 120,
	});

    $('#contact-form').submit(function(event)
	{
        event.preventDefault();

        if (!this.checkValidity())
		{
            $('#form-feedback').text("Veuillez remplir tous les champs requis").css("color", "red");
            return;
        }

        var formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "url-to-your-backend",
            data: formData,
            success: function(response) {
                $("#form-feedback").text("Message envoyé avec succès !").css("color", "green");
                $('#contact-form').trigger("reset");
            },
            error: function(xhr, status, error) {
                $("#form-feedback").text("Erreur lors de l'envoi du message : " + error).css("color", "red");
            }
        });
    });

});


    
	/*-------------------------------------
			Skills
	--------------------------------------*/
    document.addEventListener('DOMContentLoaded', function() {
        // Tableau des compétences, avec un type pour différencier hard et soft skills
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
    
        // Générer les compétences avec les barres de progression
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
            progressBar.classList.add(skill.type === 'hard' ? 'hard-skill' : 'soft-skill'); // Ajoute la classe selon le type
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
    
    

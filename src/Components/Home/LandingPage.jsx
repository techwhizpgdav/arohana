import React, { useEffect, useState } from 'react';
import $ from 'jquery';

const LandingPage = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    $(window).scroll(function(e){          
      if($(document).scrollTop() > 120) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    });
  }, []);

  useEffect(() => {
    function getOffSet(){
      var _offset = 450;
      var windowHeight = window.innerHeight;

      if(windowHeight > 500) {
        _offset = 400;
      } 
      if(windowHeight > 680) {
        _offset = 300
      }
      if(windowHeight > 830) {
        _offset = 210;
      }

      return _offset;
    }

    function setParallaxPosition($doc, multiplier, $object){
      var offset = getOffSet();
      var from_top = $doc.scrollTop(),
        bg_css = 'center ' +(multiplier * from_top - offset +150) + 'px';
      $object.css({"background-position" : bg_css });
    }      

    var background_image_parallax = function($object, multiplier, forceSet){
      multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
      multiplier = 1 - multiplier;
      var $doc = $(document);

      if(forceSet) {
        setParallaxPosition($doc, multiplier, $object);
      } else {
        $(window).scroll(function(){          
          setParallaxPosition($doc, multiplier, $object);
        });
      }
    };

    // Hero Section - Background Parallax
    background_image_parallax($(".tm-parallax"), 0.30, false);        

    // Handle window resize
    window.addEventListener('resize', function(){
      background_image_parallax($(".tm-parallax"), 0.30, true);
    }, true);


  }, []);

  return (
    <div className='landingPage' >
        <section id="hero" className="text-white tm-font-big tm-parallax">    
        <div className="dark-div"></div> 
        <div className="row" style={{opacity: opacity , transition: 'opacity 0.5s'}}>
                The Annual Cultural Fest 
        </div>
        </section>
    </div>
  );
};

export default LandingPage;
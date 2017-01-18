(function( window ) {
  var defaultAngle = '270deg';
  var fieldElementGraySelectors = document.getElementsByClassName('field__element--gray');
  var fieldColumns = document.getElementsByClassName('field__column');
  var field = document.getElementById('field');
  var gallery = document.getElementById('gallery');
  var galleryBack = document.getElementById('gallery__back');
  var galleryStatus = false;

  function angleBetweenPts(p1,p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  }

  function getFieldCenter(ele) {
    var fieldElementRect = ele.getBoundingClientRect();
    var fieldRect = field.getBoundingClientRect();
    var centerPoint = {x:(fieldElementRect.right + fieldElementRect.left)/2,y:(fieldElementRect.top + fieldElementRect.bottom)/2}
    return {
      x: centerPoint.x - fieldRect.left,
      y: centerPoint.y - fieldRect.top
    }
  }

  function domEleMap(eles,func) {
    for (var i = 0; i < eles.length; i++) {
      ele = eles[i];
      func(ele);
    }
  }

  function rotateElement(ele,angle) {
    ele.style.transform = "rotate(" + angle + ")";
    return ele;
  }

  function resetAngle() {
    domEleMap(fieldElementGraySelectors,function(ele) {
      rotateElement(ele,defaultAngle);
    })
  }

  function pointInEle(point,ele) {
    var rect = ele.getBoundingClientRect();
    return point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < react.bottom;
  }

  function fieldMouseMoveListen(e) {
    var mouseCords = {x:e.clientX,y:e.clientY};
    domEleMap(fieldElementGraySelectors,function(ele) {
      const eleCords = getFieldCenter(ele);
      rotateElement(ele,(angleBetweenPts(mouseCords,eleCords) + 45)+"deg");
    })
  }

  function generateFieldelements(column,row) {
    for(var i = 0;i<=column;i++) {
      var cln = fieldColumns[0].cloneNode(true);
      field.appendChild(cln);
    }
    fieldColumns = document.getElementsByClassName('field__column');
    domEleMap(fieldColumns,function(ele) {
      for(var i = 0;i<=row;i++) {
        var cln = fieldElementGraySelectors[0].cloneNode(true);
        ele.appendChild(cln);
      }
    })
  }

  function updateGallery() {
    if(galleryStatus) {
      classie.addClass(gallery,'gallery--open');
      classie.removeClass(gallery,'gallery--close');
      classie.addClass(field,'field--close');
      classie.removeClass(field,'field--open');
    } else {
      classie.removeClass(gallery,'gallery--open');
      classie.addClass(gallery,'gallery--close');
      classie.removeClass(field,'field--close');
      classie.addClass(field,'field--open');
    }
  }

  function onWhiteFieldEleClick(e) {
    galleryStatus = !galleryStatus;
    updateGallery();
  }

  function switchToWhite() {
    var cln = fieldColumns[2];
    var fieldElement = cln.children[9];
    fieldElement.onclick = onWhiteFieldEleClick;
    galleryBack.onclick = onWhiteFieldEleClick;
    classie.removeClass(fieldElement,'field__element--gray');
    classie.addClass(fieldElement,'field__element--white');
  }

  function init() {
    generateFieldelements(10,10);
    switchToWhite();
    fieldElementGraySelectors = document.getElementsByClassName('field__element--gray');
    resetAngle();
    updateGallery();
    field.onmousemove = fieldMouseMoveListen;
    field.onmouseEnter = fieldMouseMoveListen;
    field.onmouseleave = resetAngle;
  }

  function unload() {
    field.removeEventListener('mousemove',fieldMouseMoveListen);
    field.removeEventListener('mouseenter',fieldMouseMoveListen);
    field.removeEventListener('mouseleave',resetAngle);
    fieldElement.removeEventListener('click',onWhiteFieldEleClick);
    galleryBack.removeEventListener('click',onWhiteFieldEleClick);
  }

  init();

  window.onbeforeunload = function(){ unload(); }
})( window );

class Cat {
  constructor(name) {
    this.name = name;
    this.clicked = 0;
  };
};

let constructedCats = new Map();

//when DOM is ready:
$(function() {

const model = {
  catNames: [
    'Tubbs',
    'Peaches',
    'Sapphire',
    'Jeeves',
    'Cafe'
  ],

  constructCats: function() {
    let cats = octopus.getCatList();
    for (let i = 0; i < cats.length; i++) {
      constructedCats.set(cats[i], new Cat(cats[i]));
    };
  },


  increaseCounter: function(cat) {
    cat.clicked += 1;
  }
};

const view1 = {
  init: function() {
    let cats = octopus.getCatList();
    for (let i = 0; i < cats.length; i++) {
       $('.catPicker').append(`<li class='catName'>${cats[i]}</li>`);
     };

       $('.catName').click(function(event) {
         let clickedCat = event.target;
         let clickedCatName = clickedCat.innerHTML;
         // grab active cat object. The variable is also used when
         // the displayed cat picture is clicked later
         octopus.callActiveCat(clickedCatName);
         octopus.showCat(activeCat);
       });
  }

};

const view2 = {
  render: function(cat) {
    $('.cat-container').html(
          cat.name +
          `<img src='img\\${cat.name}.jpg' height="300">` +
          `Click Count: ${cat.clicked}`);
        },
  init: function() {
    $('.cat-container').click(function() {
      octopus.updateCat(activeCat);
    });
  }
};

const octopus = {
  init: function() {
    model.constructCats();
    view1.init();
    view2.init();
  },

  getCatList: function() {
    return model.catNames;
  },

  callActiveCat: function(cat) {
    activeCat = constructedCats.get(cat);
    return activeCat;
  },


  updateCat: function(cat) {
      model.increaseCounter(cat);
      view2.render(cat);
    },


  showCat: function(cat) {
    view2.render(cat);
  }
};


octopus.init();

});

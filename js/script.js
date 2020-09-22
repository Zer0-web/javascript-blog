'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});*/

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
    

    
  /*[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');
    
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector: ', articleSelector);

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('Article: ', targetArticle);

  /* add class 'active' to the correct article */
      
  console.log('targetArticle: ',targetArticle);
  targetArticle.classList.add('active');

};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
    
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');
    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML: ', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}



generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log('link: ', links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){
  /* START LOOP: for every article: */

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    titleList.innerHTML = '';
    /* make html variable with empty string */

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray: ', articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log('tag: ', tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#' + articleTags + '">';
      console.log('linkHTML: ', linkHTML);
      html = html + linkHTML;
    /* add generated code to html variable */
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }
}

generateTags();
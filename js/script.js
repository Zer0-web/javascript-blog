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

function generateTitleLinks(customSelector = ''){
    
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
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
      const linkHTML = '<li><a href="#' + tag + '">' + tag + '</a></li>';
      console.log('linkHTML: ', linkHTML);
      html = html + linkHTML;
    /* add generated code to html variable */
    }
    titleList.innerHTML = html;
  
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */

  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag: ', tag);
  /* find all tag links with class active */
  const tagsActiveLinks = document.querySelectorAll('a.active[href^="tag-"]');
  /* START LOOP: for each active tag link */
  for(const tagActiveLinks of tagsActiveLinks){
  /* remove class active */
    tagActiveLinks.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(const tagLinks of tagsLinks){
  /* add class active */  
    tagLinks.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log('generateTitleLinks : ', generateTitleLinks);
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag="]');
  console.log('tagsLinks: ', tagLinks);
  /* START LOOP: for each link */
  for(const link of tagLinks){
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function authorClickHandler(event) { 
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorsActiveLinks = document.querySelectorAll('a[href^="#author-"]');
  for (const authorActiveLinks of authorsActiveLinks) {
    authorActiveLinks.classList.remove('active');
  }
  const authorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (const authorLinks of authorsLinks) {
    authorLinks.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  const customSelector = '[data-author="' + author.replace('#', '') + '"]';
  generateTitleLinks(customSelector);
  console.log('customSelector: ', customSelector);
}

function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const authorLinks = document.querySelectorAll('.post-author a');
  console.log('authorLinks: ', authorLinks);

  /* START LOOP: for each link */
  for (const link of authorLinks) {
    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler); //wywołanie po kliknieciu
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

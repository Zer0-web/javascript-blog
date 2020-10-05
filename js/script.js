'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
}

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');

  /*[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorsList = '.authors',
  optTagsListSelector = '.tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'link-size-';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  // console.log(titleList);
  titleList.innerHTML = ''; 

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] get the title from the title element */

    /* [DONE] create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    // console.log(linkHTML);

    /* insert link into titleList */

    // titleList.insertAdjacentHTML('afterend', titleList.innerHTML + linkHTML);

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
// console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(allTags){ 
    
  /* create constant object with two key words: min and max  */

  const params = {
    max: 0,
    min: 99999
  };

  /* START LOOP: for each tag in tags */

  for(let tag in allTags){
    if(allTags[tag] > params.max){
      params.max = allTags[tag];
    }
    if(allTags[tag] < params.min){
      params.min = allTags[tag];
    }
  }


  // /* END LOOP */

  return params;

}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;

}



function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll('article');
  // console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    // console.log(article);

    const tagWrapper = article.querySelector(optArticleTagsSelector);
    // console.log(tagWrapper);
    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
   
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      // console.log(tag);

      /* generate HTML of the link */

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      // const linkHTML = '<li><a href="#tag-' + tag +  '"><span>' + tag + '</span></a></li>';

      // console.log(linkHTML);
      
      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1 ;
      } else{
        allTags[tag]++;
      }
      
      /* END LOOP: for each tag */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');
    
    // console.log(allTags);
    const tagsParams = calculateTagsParams(allTags);

    // eslint-disable-next-line no-inner-declarations

    // console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */

    const allTagsData = {tags: []};
    // let allTagsHTML = '';

    // eslint-disable-next-line no-inner-declarations

    /* [NEW] START A LOOP: for each tag in allTags: */

    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML*/
      
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"' + 'class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag +  '</a></li>';
      
      // console.log('taglinkHTML:', tagLinkHTML);

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      // allTagsHTML += tagLinkHTML; 
      //'<li><a href="#' + tag + '">' + calculateTagClass(allTags[tag], tagsParams) + '</a></li>';

      
    }


    /* [NEW] END LOOP: for each tag in allTags:*/

    /* [NEW] add html from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);

    console.log(allTagsData);

    /* insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    
    
  }
  
}


generateTags();






function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href="' + href + '"]');

  /* [DONE] START LOOP: for each active tag link */

  for(let tagLink of tagLinks){
    /* [DONE] remove class active */
    
    const removeClassActive = tagLink.classList.remove('.active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [IN PROGRESS] find all tag links with "href" attribute equal to the "href" constant */

  const equalLinks = document.querySelectorAll('a[href ="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let equalLink of equalLinks){
    
    console.log(equalLink);

    /* add class active */

    let addClassActive = equalLink.classList.add('.active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}


function addClickListenersToTags(){
  /* find all links to tags */

  const tagsLinks = document.querySelectorAll('.post-tags a');
  // console.log(tagsLinks);

  /* START LOOP: for each link */

  for(let tagLink of tagsLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  }

  /* END LOOP: for each link */
}

addClickListenersToTags();


function addClickListenersToSideTags(){
  /* find all links to tags */

  const tagsLinks = document.querySelectorAll('.sidebar .tags a');
  // console.log(tagsLinks);

  /* START LOOP: for each link */

  for(let tagLink of tagsLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  }

  /* END LOOP: for each link */
}

addClickListenersToSideTags();

function calculateAuthorsParams(allAuthors){

  const params = {
    min: 99999,
    max: 0
  };

  for(let author in allAuthors){
    if(allAuthors[author] > params.max){
      params.max = allAuthors[author];
    }
    if(allAuthors[author < params.min]){
      params.min = allAuthors[author];
    }

    console.log(author + ' is used ' + allAuthors[author] + ' times');
  }

  return params; 
}

function calculateAuthorClass(count, params){

  const normalizedCount = count - params.min;

  const highestValue = params.max - params.min;

  const percentage = normalizedCount/highestValue;

  const authorClass = Math.floor( percentage * (optCloudClassCount - 1 ) + 1);

  return optCloudClassPrefix + authorClass;

}

function generateAuthors(){

  let allAuthors = {};
  /* [DONE] find and clear list of authors from HTML code */

  // const authorsList = document.querySelectorAll(".sidebar .list .authors");
  // for (authorList of authorsList){
  //   authorList.innerHTML = ''; 
  // }
  /* find all articles */ 

  const articles = document.querySelectorAll('article');
  // console.log(articles);

  /* START LOOP: for each articles */
  
  for(let article of articles){

    /* find author container on every article variable */ 

    const authorsConstainer = article.querySelector(optArticleAuthorSelector);
    // console.log(authorsConstainer);
    
    /* make new variable html with empty string */

    let html = '';

    /* find author on every article */

    const author = article.getAttribute('data-author');
    // console.log(author);

    const linkHTMLData = {id: author, title: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    // const linkHTML = '<a href="#' + author  + '"><span class="author-name">' + author + '</span></a>';
  
    html = html + linkHTML;

    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    }
    else{
      allAuthors[author]++;
    }

    const authorsList = document.querySelector(optArticleAuthorsList);

    const authorsParams = calculateAuthorsParams(allAuthors);

    let allAuthorsData = {authors: []};

    for(let author in allAuthors){

      const authorLinkHTML = '<li><a href="#' + author + '" class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '">' + author + '</a></li>';
      
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorsParams)
      });
    }
   
    authorsList.innerHTML = templates.authorListLink(allAuthorsData);

    authorsConstainer.innerHTML = html;
  }

  

}


generateAuthors();


function authorClickHandler(event){

  /* preventDefault action for that event */

  event.preventDefault();

  /* creat const that contains clicked element*/

  const clickedElement = this;

  /* get href atrribute from clicked element */

  const href = clickedElement.getAttribute('href');

  /* creat new const author and extract author's name from href attribute */

  const author = href.replace('#', '');
  
  /* get all authors link with class active */

  const activeLinks = document.querySelectorAll('a.active[href="' + href + '"]');

  /* START LOOP: for each artiveLinks */

  for(let activeLink of activeLinks){

    /* remove active class from every activeLink */

    const removeActiveClass = activeLink.classList.remove('.active');

    /* END LOOP */

  }

  /* get all links with const href */
  
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]'); 

  /* START LOOP: for each authorLinks */

  for(let authorLink of authorLinks){

    /* add class active for every link */ 

    const addActiveClass = authorLink.classList.add('.active');

    /* END LOOP */
  }


  generateTitleLinks('[data-author ="' + author + '"]');


}

function addClickListenersToAuthors() {

  const allAuthors = document.querySelectorAll('.post-author a');
  
  for (let author of allAuthors){
    author.addEventListener('click', authorClickHandler);
  }
  

}

addClickListenersToAuthors();


function addClickListenersToSideAuthors() {

  const allAuthors = document.querySelectorAll('.authors a');
  
  for (let author of allAuthors){
    author.addEventListener('click', authorClickHandler);
  }
  

}

addClickListenersToSideAuthors();
{
'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

  
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    
    clickedElement.classList.add('active'); 
    console.log('clickedElement:', clickedElement);
  
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }   

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle', targetArticle);

    /* {DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active'); 

  }
  


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log('Removed ',titleList);

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log('articleId', articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle:', articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link: ', linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  
  titleList.innerHTML = html;
  console.log('html: ', html);
}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
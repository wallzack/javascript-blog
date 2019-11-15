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
    /* console.log('clickedElement:', clickedElement); */

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    /* console.log('articleSelector', articleSelector); */

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    /* console.log('targetArticle', targetArticle); */

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };



  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* console.log('Removed ',titleList); */

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      /* console.log('articleId', articleId); */

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* console.log('articleTitle:', articleTitle); */

      /* [DONE] get the title from the title element */

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* console.log('link: ', linkHTML); */

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
  }

  generateTitleLinks();
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('found articles: ', articles);

    /* START LOOP: for every article: */

    for(let article of articles){

      /* find tags wrapper */

      const tagList = article.querySelector(optArticleTagsSelector);
      console.log('found tags wrapper:', tagList);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log('found tags: ', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log('array: ', articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray){
        console.log('found tag:', tag);
        /* generate HTML of the link */

        const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        console.log('added tagHTML: ', tagHTML);

        /* add generated code to html variable */
        html = html + tagHTML + ' ';


      /* END LOOP: for each tag */

      }

      /* insert HTML of all the links into the tags wrapper */

      tagList.innerHTML = html;

    /* END LOOP: for every article: */
    }
  }
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */

    /* make new constant named "clickedElement" and give it the value of "this" */

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    /* make a new constant "tag" and extract tag from the "href" constant */

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

      /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

      /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
  }

  function addClickListenersToTags(){
    /* find all links to tags */

    /* START LOOP: for each link */

      /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  }

  addClickListenersToTags();

}       

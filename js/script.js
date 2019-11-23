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
    //console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    // console.log('articleSelector', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    // console.log('targetArticle', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleSingleTagSelector = '.post-tags a',
    optTagsListSelector = '.list.tags a',
    optArticleAuthorSelector = '.post-author',
    optArticleSingleuthorSelector = '.post-author a',
    optAuthorsListSelector = '.list.authors a',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    // onsole.log('Removed ',titleList);

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log('custom: ', customSelector);
    //console.log('opt + custom: ', optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      // onsole.log('articleId', articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      // console.log('articleTitle:', articleTitle);

      /* [DONE] get the title from the title element */
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log('link: ', linkHTML);

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

  function calculateTagsParams (tags){
    const params = {
      max: 0,
      min: 99999,
    };
    for(let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagsClass(count, params){

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount/normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount -1) + 1 );
    const classAndValueNumber = optCloudClassPrefix + classNumber;
    return classAndValueNumber;
  }

  /* GENERATE TAGS */

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('found articles: ', articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      //console.log('found tags wrapper:', tagList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log('found tags: ', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log('array: ', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){
        //console.log('found tag:', tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        //console.log('added linkHTML: ', linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML + ' ';

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;

    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams: ', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="' + calculateTagsClass(allTags[tag], tagsParams) +  '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';
      allTagsHTML += tagLinkHTML;
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:>>>>>>>>>>>', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags){

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleSingleTagSelector + ',' + optTagsListSelector);
    console.log('fffff: ', tagLinks);
    /* START LOOP: for each link */
    for (let tag of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();


  /* GENERATE AUTHORS */
  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find author wrapper */
      const authorList = article.querySelector(optArticleAuthorSelector);
      console.log('found Author wrapper: ', authorList);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('found Authors from data-author: ', articleAuthor);

      /* generate HTML of the link */
      const authorLinkHTML = '<li><a href="#author"><span>' + articleAuthor + '</span></a></li>';
      console.log('generated linkAuthorHTML: ', authorLinkHTML);

      /* add generated code to html variable */
      html = html + authorLinkHTML;
      console.log('added code to html: ', html);

      /* add html for each author wrapper */
      authorList.innerHTML = html;
      console.log('added html for each autorh: ', html);
    }

    /* END LOOP: for every article: */
  }

  generateAuthors();

  function authorClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);
    
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author', '');

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href="#author"]');

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors){

      /* remove class active */
      activeAuthor.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks){

      /* add class active */
      authorLink.classList.add('active');

    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-authors="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorLinks = document.querySelectorAll(optAuthorsListSelector + ',' + optArticleSingleuthorSelector);
    console.log('eeeeee', authorLinks);
    /* START LOOP: for each link */
    for (let author of authorLinks) {

      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();
}

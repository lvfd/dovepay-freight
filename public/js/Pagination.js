function Pagination(data, indexPage) {
  this.totalPage = data.totalPage;
  this.totalCount = data.totalCount;
  this.indexPage = indexPage;
  this.pagination = '';
}
Pagination.prototype.create = function(args) { // {indexPage: 1, *parentNodeId: '', *maxPage: ''}
  var totalPage = Number(this.totalPage), // 总页数
      totalCount = Number(this.totalCount), // 总条数
      indexPage = this.indexPage,
      maxPage = 10;
  if (totalPage > 1) {
    var parentNode = document.querySelector('main .maincontent'),
        ul = Pagination.createUl();
    if (indexPage != 1) {
      ul.appendChild(Pagination.createLi(ul, 'previous', indexPage - 1));
    }
    for ( var i = 1; i <= totalPage; i++) {
      ul.appendChild(Pagination.createLi(ul, i, i));
    }
    if (indexPage != totalPage) {
      ul.appendChild(Pagination.createLi(ul, 'next', indexPage + 1));
    }
    ul.appendChild(Pagination.createInput());
    ul.appendChild(Pagination.createButton('跳转'));
    if (!!args && !!args.parentNodeId) {
      parentNode = document.querySelector('#' + args.parentNodeId);   
    }
    this.pagination = ul;
    parentNode.appendChild(ul);
    if ( indexPage == 1 ) {
      Pagination.highlightIndex(this.pagination, indexPage);
    }
    if (!!args && !!args.maxPage) {
      maxPage = Number(args.maxPage);
    }
    if (totalPage > maxPage) {
      // Set middle:
      var middle = maxPage / 2;
      if (maxPage % 2 != 0) {
        middle = (maxPage + 1) / 2;
      }
      // Only hide end:
      if (indexPage <= middle) {
        Pagination.omit(this.pagination, maxPage - 1, totalPage - 1);
      }
      // Only hide start:
      if (totalPage - indexPage <= middle) {
        Pagination.omit(this.pagination, 2, totalPage - maxPage + 2);
      }
      // Hide start & end:
      if (indexPage > middle && totalPage - indexPage > middle) {
        if ( middle % 2 != 0) {
          middle++;
        }
        Pagination.omit(this.pagination, 2, indexPage - middle / 2 - 1);
        Pagination.omit(this.pagination, indexPage + middle / 2 + 1, totalPage - 1);
      }
    }
  }
}
Pagination.createUl = function() {
  var ul = '',
      oldUl = document.querySelector('ul.uk-pagination');
  if ( document.querySelector('ul#pagination')) {
    ul = document.querySelector('ul#pagination');
    ul.innerHTML = '';
  } else if ( oldUl ) {
    ul = oldUl;
    ul.innerHTML = '';
  } else {
    ul = document.createElement('ul');
  }
  ul.setAttribute('class', 'uk-pagination uk-flex-center');
  ul.setAttribute('uk-margin');
  return ul;
};
Pagination.createLi = function(pag, type, to) {
  var li = document.createElement('li'),
      a = document.createElement('a');
  if (type == 'previous' || type == 'next') {
    var span = document.createElement('span'),
        attr = (type == 'previous')? 
              'uk-pagination-previous':
              'uk-pagination-next';
    span.setAttribute(attr);
    a.appendChild(span);
    li.appendChild(a);
    a.addEventListener('click', function(event){
      event.preventDefault();
      $('form.fn_showTab').fn_showTab(to);
      Pagination.highlightIndex(pag, to);
    });
   } else {
    a.innerHTML = type;
    li.setAttribute('data-pn', type);
    li.appendChild(a);
    a.addEventListener('click', function(event){
      event.preventDefault();
      $('form.fn_showTab').fn_showTab(to);
      Pagination.highlightIndex(pag, to);
      console.log(to);
      this.indexPage = type;
    });
  }
  // li.appendChild(a);
  return li;
};
Pagination.createInput = function() {
  var li = document.createElement('li'),
      input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'uk-input uk-form-width-xsmall');
  li.appendChild(input);
  return li;
};
Pagination.createButton = function(name) {
  var li = document.createElement('li'),
      button = document.createElement('button');
  button.setAttribute('class', 'button button-primary');
  button.innerHTML = name
  li.appendChild(button);
  return li;
};
Pagination.highlightIndex = function(pagination, page) {
  var li = pagination.querySelector('li[data-pn="'+ page + '"]'),
      ul = li.parentNode,
      span = document.createElement('span');
  var liact = ul.querySelectorAll('li.uk-active');
  for (var i = 0; i < liact.length; i++) {
    liact[i].classList.remove("uk-active");
    if (liact[i].querySelector('span')) {
      var a = document.createElement('a');
      a.innerHTML = liact[i].querySelector('span').innerHTML
      liact[i].innerHTML = '';
      liact[i].appendChild(a);
    }
  }
  span.innerHTML = page;
  li.innerHTML = '';
  li.setAttribute('class', 'uk-active');
  li.appendChild(span);
};
Pagination.omit = function(pagination, start, end) {
  if (start < end) {
    var omitli = document.createElement('li'),
        span = document.createElement('span'),
        position = pagination.querySelector('li[data-pn="'+ end + '"]');
    span.innerHTML = '...';
    omitli.appendChild(span);
    omitli.setAttribute('class', 'uk-disabled');
    pagination.insertBefore(omitli, position);
    for (var i = start; i <= end; i++) {
      var li = pagination.querySelector('li[data-pn="'+ i + '"]');
      li.style.display = 'none';
    }
  }
};
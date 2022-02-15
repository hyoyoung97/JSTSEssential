//`사용 => `${}`

const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

//ajax로 화면에 뿌릴 데이터 받기
ajax.open('GET', NEWS_URL, false);//false -> 비동기를 쓰지 않음()
ajax.send();
const newsFeed = JSON.parse(ajax.response);

const ul = document.createElement('ul');

//hashchange가 일어났을 때 (click 대신쓰임)
window.addEventListener('hashchange', () => {
  const id = location.hash.substr(1);

  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();
  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  content.innerHTML = newsContent.title;
  content.appendChild(title);
});

for(let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = '#';
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

document.getElementById('root').appendChild(ul);
document.getElementById('root').appendChild(content);
/* global alert, fetch, $ */
function edit(id) {
  const fio = $('#fio').val();
  const age = $('#age').val();
  const date = $('#date').val();

  fetch('http://localhost:8080/guide/'+id.toString(), {
    method: 'PUT',
    body: JSON.stringify({
      fio: fio,
      age: age,
      date: date
    }),
    headers: { 'Content-Type': 'application/json' }
  }).then(function () {
    $('#table').html('');
    Render();
  })
}

function remove(id) {
  fetch('http://localhost:8080/guide/'+id.toString(), {
    method: 'DELETE'
  }).then(function(){
    $('#table').html('');
    Render();
  })
}

function add() {

  const fio = $('#fio').val();
  const age = $('#age').val();
  const date = $('#date').val();

  fetch('http://localhost:8080/guide', {
    method: 'POST',
    body: JSON.stringify({
      fio: fio,
      age: age,
      date: date
    }),
    headers: { 'Content-Type': 'application/json' }
  }).then(function () {
    $('#table').html('');
    Render();
  })
}

function strng(guide, i) {
  const tr = $('<tr/>');

  tr.append($('<td/>', { html: i.toString()}));
  tr.append($('<td/>', { html: guide.fio}));
  tr.append($('<td/>', { html: guide.age}));
  tr.append($('<td/>', { html: guide.date}));

  const bttns = $('<td/>');

  bttns.append($('<button/>', {
    text: 'Изменить',
    class: 'btn btn-primary',
    click: function () {edit(i)}
  }));
  bttns.append($('<button/>', {
    text: 'Удалить',
    class: 'btn btn-danger',
    click: function () {remove(i)}
  }));

  tr.append(bttns);

  return tr;
}
function Render(){
  fetch('http://localhost:8080/guide')
      .then((res) => res.json().then(function(res) {

        const table = $('#table')
        for (let i = 0; i < res.length; i++) {

          if (res[i] != null) {

            const tr = strng(res[i], i);
            console.log(tr);
            table.append(tr);
          }
        }
      }))
}
$(document).ready(Render)

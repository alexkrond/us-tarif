(async () => {
  const table = document.querySelector('.tariffs');
  const res = await fetch('/getTariffs')
      .catch(err => loadTariffsError(table, err.message));
  const json = await res.json();

  if (json.status !== 'OK') {
    loadTariffsError(table, json.msg);
    return;
  }

  const tariffs = json.tariffs;
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  thead.appendChild(getTr(tariffs[0], true));
  tariffs.forEach(t => tbody.appendChild(getTr(t, false)));
  table.appendChild(thead);
  table.appendChild(tbody);

  function getTr(tariff, isHead) {
    const tr = document.createElement('tr');
    for(let d in tariff) {
      if (tariff.hasOwnProperty(d)) {
        if (isHead) {
          const th = document.createElement('th');
          th.setAttribute('scope', 'col');
          th.innerHTML = d;
          tr.appendChild(th);
        } else {
          const td = document.createElement('td');
          td.innerHTML = tariff[d];
          tr.appendChild(td);
        }
      }
    }
    return tr;
  }
})();

function loadTariffsError(table, msg) {
  table.innerHTML = 'Ошибка загрузки данных';
  console.error(msg);
}

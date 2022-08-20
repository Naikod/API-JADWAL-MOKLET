function JamBRP() {
  let timenow = new Date()
  let SECNOW = Math.floor(timenow.getTime()/1000)
  let year = timenow.getFullYear();
  let day = timenow.getDate();
  let monet = timenow.getMonth()
  let timeprog = new Date(year, monet, day, 6, 15)
  let sectimepro = Math.floor(timeprog.getTime()/1000)
  let jam = [(sectimepro*1000)+2700000*1, (sectimepro*1000)+2700000*2, (sectimepro*1000)+2700000*3, (sectimepro*1000)+2700000*4, (sectimepro*1000)+2700000*5, (sectimepro*1000)+2700000*6, (sectimepro*1000)+2700000*7, (sectimepro*1000)+2700000*8, (sectimepro*1000)+2700000*9, (sectimepro*1000)+2700000*10]
  let testtime = new Date(jam[0])
  if(jam[0]<=SECNOW) {
      return "1"
  } else if(jam[1]<=SECNOW) {
      return "2"
  } else if(jam[2]<=SECNOW) {
      return "3"
  } else if(jam[3]<=SECNOW) {
      return "4"
  } else if(jam[4]<=SECNOW) {
      return "5"
  } else if(jam[5]<=SECNOW) {
      return "6"
  } else if(jam[6]<=SECNOW) {
      return "7"
  } else if(jam[7]<=SECNOW) {
      return "8"
  } else if(jam[8]<=SECNOW) {
      return "9"
  } else if(jam[9]<=SECNOW) {
      return "10"
  } else {
      return "0"
  }}
function hariApa(intday) {
  if (intday == 0) {
    return "Sunday"
  } else if (intday == 1) {
    return "Monay"
  } else if (intday == 2) {
    return "Tuesday"
  } else if (intday == 3) {
    return "Wednesday"
  } else if (intday == 4) {
    return "Thursday"
  } else if (intday == 5) {
    return "Friday"
  } else if (intday == 6) {
    return "Saturday"
  }
}

const fetch = require('node-fetch');
const rs = require('readline-sync');
const kelas = rs.question("Project by: Ridwan XRPL6\nMasukkan Kelas anda dengan format contoh XRPL7/XITKJ2\n>>")
setInterval(() => {
const GetData = () => new Promise((resolve, reject) => {

  fetch('https://siswa.smktelkom-mlg.sch.id/jadwal_pelajaran_xls/jadwal', {
      method: 'GET'
  })
  .then(res => res.text())
  .then(data=> {
      resolve(data);
  })
  .catch(err => {
      reject(err);
  });

});

(async () => {
      const result = await GetData();
      console.clear()
      if (!result) {

          console.log('[+] API SALAH');

      } else if (result) {

          const data = JSON.parse(result);
          const dtngajar = data.dt_mengajar;
          const d = new Date();
          let intday = 5;        
          const filters = dtngajar.find((currentElement) => {
            return currentElement.class === kelas && currentElement.hour === JamBRP() && currentElement.day === hariApa(intday);
          });
          const nextPelajaran = dtngajar.find((currentElement) => {
            return currentElement.class === kelas && currentElement.hour === JamBRP() && currentElement.day === hariApa(intday);
          });
          if(!filters) {
            if(nextPelajaran) {
              console.log(`${nextPelajaran.class}\nJADWAL HARI    :${nextPelajaran.day} - ${nextPelajaran.hour-1}\nMata Pelajaran : Tidak ada mata pelajaran saat ini\nMata Pelajaran selanjutnya: ${nextPelajaran.subject} - ${nextPelajaran.teacher}\n\n`)
            } else {  
              console.log("Tidak ada pelajaran saat ini")
            }
          } else if(filters) {
              if (filters) {
                const p_class = filters.class;
                const p_day = filters.day;
                const p_hour = filters.hour;
                const p_mapel = filters.subject;
                const guru = filters.teacher;
                console.log(`\n\n${p_class}\nJADWAL HARI    : ${p_day} - ${p_hour}\nMata Pelajaran : ${p_mapel} - ${guru} `)
              }
              if (nextPelajaran) {
                const n_mapel = nextPelajaran.subject;
                const n_guru = nextPelajaran.teacher;
                console.log(`Pelajaran Selanjutnya: ${n_mapel} - ${n_guru}\n`)
              } else {
                console.log(`Pelajaran Selanjutnya: Tidak ada mata pelajaran\n\n`)
              }
          }
                }
})();}, 3000)

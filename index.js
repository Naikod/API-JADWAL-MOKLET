function JamBRP() {
  let timenow = new Date()
  let SECNOW = Math.floor(timenow.getTime())
  let year = timenow.getFullYear();
  let day = timenow.getDate();
  let monet = timenow.getMonth()
  let timeprog = new Date(year, monet, day, 6, 15, 0, 0)
  let sectimepro = Math.floor(timeprog.getTime()/1000)
  let jam = [(sectimepro*1000)+2700000*1, //akhir jam 1
             (sectimepro*1000)+2700000*2, //akhir jam 2
             (sectimepro*1000)+2700000*3, //akhir jam 3
             (sectimepro*1000)+1800000+2700000*4, //akhir jam 4
             (sectimepro*1000)+1800000+2700000*5, //akhir jam 5
             (sectimepro*1000)+1800000+2700000*6, //akhir jam 6
             (sectimepro*1000)+1800000+2700000*8, //akhir jam 7
             (sectimepro*1000)+1800000+2700000*9, //akhir jam 8
             (sectimepro*1000)+1800000+2700000*10, //akhir jam 9
             (sectimepro*1000)+1800000+2700000*11] //akhir jam 10
  if(SECNOW<=jam[0]) {
      return "1"
  } else if(SECNOW<=jam[1]) {
      return "2"
  } else if(SECNOW<=jam[2]) {
      return "3"
  } else if(SECNOW<=jam[3]) {
      return "4"
  } else if(SECNOW<=jam[4]) {
      return "5"
  } else if(SECNOW<=jam[5]) {
      return "6"
  } else if(SECNOW<=jam[6]) {
      return "7"
  } else if(SECNOW<=jam[7]) {
      return "8"
  } else if(SECNOW<=jam[8]) {
      return "9"
  } else if(SECNOW<=jam[9]) {
      return "10"
  } else {
      return "0"
  }}
function hariApa(intday) {
  if (intday == 0) {
    return "Sunday"
  } else if (intday == 1) {
    return "Monday"
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
const kelas = rs.question("[Note] > Program akan terefresh setiap 1 Menit\nProject by: Ridwan XRPL6\nMasukkan Kelas anda dengan format contoh XRPL7/XITKJ2\n>>")
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
          let intday = d.getDay();        
          const filters = dtngajar.find((currentElement) => {
            return currentElement.class === kelas && currentElement.hour === JamBRP() && currentElement.day === hariApa(intday);
          });
          const nextPelajaran = dtngajar.find((currentElement) => {
            const jame = JamBRP()
            const intjam = parseInt(jame)
            const tambahan1 = intjam+1
            const nextjam = tambahan1.toString()
            const nextHour = nextjam
            
            return currentElement.class === kelas && currentElement.hour === nextHour && currentElement.day === hariApa(intday);
          });
          if(!filters) {
            if(nextPelajaran) {
              console.log(`\n\n${nextPelajaran.class}\nJADWAL HARI    :${nextPelajaran.day} - ${nextPelajaran.hour-1}\nMata Pelajaran : Tidak ada mata pelajaran saat ini\nMata Pelajaran selanjutnya: ${nextPelajaran.subject} - ${nextPelajaran.teacher}\n\n`)
            } else {  
              console.log(`\n\nTidak ada pelajaran saat ini\n\n`)
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
                console.log(`Pelajaran Selanjutnya: ${n_mapel} - ${n_guru}\n\n`)
              } else {
                console.log(`Pelajaran Selanjutnya: Tidak ada mata pelajaran\n\n`)
              }
          }
                }
})();}, 60000)

module DateTime {
   export function IntTwoChars(i: number) {
      return (`0${i}`).slice(-2);
   }
   
   export function getCurrentDateAsTimeStamp() {
      let date = new Date();
      let day = IntTwoChars(date.getDate());
      let month = IntTwoChars(date.getMonth() + 1);
      let year = date.getFullYear();
      let hours = IntTwoChars(date.getHours());
      let minutes = IntTwoChars(date.getMinutes());
      let seconds = IntTwoChars(date.getSeconds());
      let dateTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
   
      return dateTimestamp;
   }
}

export default DateTime

export default class DateTime {
   public static getCurrentDateAsTimeStamp() {
      let date = new Date();
      let day = DateTime.IntTwoChars(date.getDate());
      let month = DateTime.IntTwoChars(date.getMonth() + 1);
      let year = date.getFullYear();
      let hours = DateTime.IntTwoChars(date.getHours());
      let minutes = DateTime.IntTwoChars(date.getMinutes());
      let seconds = DateTime.IntTwoChars(date.getSeconds());
      let dateTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
   
      return dateTimestamp;
   }

   private static IntTwoChars(i: number) {
      return (`0${i}`).slice(-2);
   }
}


class DateManager{
    private actualDate;
    private actualYear;

    constructor(){
        this.actualDate = new Date();
        this.actualYear = this.actualDate.getFullYear();
    }

    public dateJStoISO(): string | Date{
        return new Date(this.actualDate.getTime() - (this.actualDate.getTimezoneOffset() * 60000)).toISOString();
    }

    public dateJStoBR(): string | Date{
        return new Date().toLocaleString("pt-BR");
    }

    public dateJStoSQLdateTime(){
        const firstDayOfYear = new Date(this.actualYear, 0, 1);
        return new Date(firstDayOfYear.getTime() - (this.actualDate.getTimezoneOffset() * 60000)).toISOString();
    }

    public getActualMonth(){
        const month = (this.actualDate.toDateString()).split(" ");
        return month[1];
    }

    public separateDate(date: string): {dayMonthYear: string, hourMinuteSecond: string}{
        const newDate = date.split("T");
        const diaMesAno = newDate[0].split("-");
        const diaMesAnoFormatado = diaMesAno[2] + "/" + diaMesAno[1] + "/" + (diaMesAno[0].slice(diaMesAno[0].length - 2));
        const horaMinutoSegundo = newDate[1].split(":")

        return { 
            dayMonthYear: diaMesAnoFormatado, 
            hourMinuteSecond: (horaMinutoSegundo[0] + ":" + horaMinutoSegundo[1]) 
        }
    }

    public getActualYear(){
        return this.actualYear;
    }
}

export { DateManager }
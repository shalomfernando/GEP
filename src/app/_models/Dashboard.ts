export interface Dashboard {
  labels: string[];
  datasets: [
     { label: string, backgroundColor: string, borderColor: string, data: string }
    ];
}



type ToastFunction = (options: {
    variant?: string;
    title?: string;
    description?: string;
  }) => void;

export const customTosat = (idx:number,toast :ToastFunction  ) => {

    switch (idx) {
        case 1:
            toast({
                variant: "destructive",
                title: "New Player Joined",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
        case 2:
            toast({
                variant: "destructive",
                title: "Player Limit changed",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
        case 3:
            toast({
                variant: "destructive",
                title: "Room has filled , Captain start the match",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
        case 4:
            toast({
                variant: "destructive",
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
        case 5:
            toast({
                variant: "destructive",
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
        case 6:
            toast({
                variant: "destructive",
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
        case 7:
            toast({
                variant: "destructive",
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            break;
    
        default:
            break;
    }


}
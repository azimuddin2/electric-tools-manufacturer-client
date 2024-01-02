import { useQuery } from "@tanstack/react-query";

const useReview = () => {

    const { data: testimonials, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reviews');
            const data = await res.json();
            return data;
        }
    });

    return [testimonials, isLoading];
}

export default useReview;
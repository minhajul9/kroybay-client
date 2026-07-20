import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import { useMutation } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

const AddToCart = (
    {
        successResponse,
        slug,
        variantId,
        productId,
        quantity
    }
        :
        {
            slug: string,
            variantId: string,
            productId: string,
            quantity: number,
            successResponse?: () => void;
        }) => {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!auth.accessToken) {
            router.push(`/login?slug=${slug}`);
            throw new Error("Please login to continue");
        }

        const cartInfo = {
            quantity,
            productId,
            variantId
        };

        const res = await axiosPrivate.post("/cart", cartInfo);
        return res.data;
    };

    const { mutate: addToCart, isPending } = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: handleAddToCart,
        onSuccess: (data) => {
            toast.success(data.message, { position: "bottom-right" });
            queryClient.setQueryData(["cartInfo"], () => data.data);
            successResponse?.();
        },
        onError: (error: {
            response?: { data?: { message?: string } };
            message?: string;
        }) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An unexpected error occurred";
            toast.error(errorMessage, { position: "bottom-right" });
        },
    });


    return (
        <Button
            size="lg"
            className="group relative h-12 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95"
            disabled={isPending}
            onClick={() => addToCart()}
        >
            <ShoppingCartIcon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            Add to Cart
        </Button>
    )
}

export default AddToCart
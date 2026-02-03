import { cookies } from "next/headers";
import { apiBaseUrl } from "@/config/config";

export async function getLayoutData() {
  const cookieStore = await cookies();

  // Get user
  const userCookie = cookieStore.get("user");
  const correlationCookie = cookieStore.get("correlation");

  let user: any = null;
  if (userCookie?.value) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  } else if (correlationCookie?.value) {
    try {
      user = JSON.parse(correlationCookie.value);
    } catch (error) {
      console.error("Failed to parse correlation cookie:", error);
    }
  }

  // Get cart
  const userId = user?.id;
  let products = null;
  
  if (userId) {
    try {
      const res = await fetch(
        `${apiBaseUrl}/cart?userId=${userId}&coupon=`,
        {
          next: { revalidate: 0 }, // Always fresh for cart
          headers: {
            'Cache-Control': 'no-cache',
          },
        }
      );
      
      if (res.ok) {
        products = await res.json();
      } else {
        console.error("Failed to fetch cart. Status:", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      // Don't throw, just return null products
    }
  }

  return { user, products };
}
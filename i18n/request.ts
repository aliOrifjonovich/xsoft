import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = (await cookies()).get("locale");
  const locale = cookieStore ? cookieStore.value : "uz";

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});

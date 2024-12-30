export const handleRouting = (e: any, url: string, router: any) => {
  e.preventDefault();
  router.push(url);
};

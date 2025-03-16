export async function useFetchBlogContent() {
  const { data: contentBlog } = await useAsyncData('contentBlog', () =>
    queryContent('blog')
      .where({ _path: { $eq: '/blog' } })
      .findOne()
  );

  return { contentBlog };
}

export function useBlogPageHelpers() {
  const blockStore = useCounterStore()

  const renderDateMonth = (fullDate: string) => {
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'short' });
    return { date, month };
  };

  const formatDateTime = (fullDate: string) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const year = newDate.getFullYear();
    const day = weekday[newDate.getDay()];
    const month = newDate.toLocaleString('default', { month: 'short' });
    const time = newDate.getHours().toString().padStart(2,'0');
    const minute = newDate.getMinutes().toString().padStart(2,'0');
    const UTC = newDate
    const formatDate = `${day},  ${month} ${date}, ${year} ${time}:${minute}`
    return formatDate;
  };

  const renderDatePost = (fullDate: string) => {
    const dateInitial = new Date(fullDate);
    const dateFinal = new Date();
    // Các hàm tính toán
    const dateDifferenceInSeconds = (dateInitial, dateFinal) =>
      (dateFinal - dateInitial) / 1000;

    const dateDifferenceInMinutes = (dateInitial, dateFinal) =>
      (dateFinal - dateInitial) / (1000 * 60);

    const dateDifferenceInHours = (dateInitial, dateFinal) =>
      (dateFinal - dateInitial) / (1000 * 60 * 60);

    const dateDifferenceInDays = (dateInitial, dateFinal) =>
      (dateFinal - dateInitial) / (1000 * 60 * 60 * 24);

    // Tính sự khác biệt theo giây
    const differenceInSeconds = dateDifferenceInSeconds(dateInitial, dateFinal);

    // Sử dụng switch để xác định khoảng thời gian
    let result;
    switch (true) {
      case differenceInSeconds < 60:
        // result = `${Math.floor(differenceInSeconds)} seconds ago`;
        result = 'Just now';
        break;
      case differenceInSeconds < 3600:
        const differenceInMinutes = dateDifferenceInMinutes(
          dateInitial,
          dateFinal
        );
        result = `${Math.floor(differenceInMinutes)} minutes ago`;
        break;
      case differenceInSeconds < 86400:
        const differenceInHours = dateDifferenceInHours(dateInitial, dateFinal);
        result = `${Math.floor(differenceInHours)} hours ago`;
        break;
      case differenceInSeconds < 86400 * 4:
        const differenceInDays = dateDifferenceInDays(dateInitial, dateFinal);
        result = `${Math.floor(differenceInDays)} days ago`;
        break;
      default:
        result = formatDateTime(fullDate);
        break;
    }
    return result
  };

  function convertToCapitalized(str: string) {
    if (!str) return '';
    return (
      str.charAt(0).toUpperCase().trimEnd() +
      str.slice(1).toLowerCase().trimEnd()
    );
  }

  const renderCateOrTag = (post: any, key: string) => {
    let object = [];
    if (key in post && Array.isArray(post[key]) && post[key].length > 0) {
      post[key].map((item: any, index: any) => {
        if (typeof item.text === 'string') {
          object.push({
            text:
              index !== post[key].length - 1
                // ? `${convertToCapitalized(item.text)}, `
                ? `${convertToCapitalized(item.text)}`
                : convertToCapitalized(item.text),
            _path: `${blockStore.lang}blog/${key}/${item.text
              .toLowerCase()
              .trimEnd()
              .replace(/\s+/g, '-')}`,
            open_new_tab: item?.open_new_tab
          });
        }
      });
    }
    const dataRemoveDuplicate = object.filter((value, index, self) => {
      return index === self.findIndex((v) => v.text === value.text);
    });

    return dataRemoveDuplicate;
  };

  return { renderDateMonth, renderCateOrTag, renderDatePost, formatDateTime };
}

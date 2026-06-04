export const card = {
  base: `
    flex flex-col
    border border-gray-400
    bg-gray-500
    overflow-hidden
  `,

  defaultSize: `
    w-[170px] min-h-[234px] p-[10px]
    tablet:w-[342px] tablet:min-h-[517px] tablet:p-[30px]
    desktop:w-[440px] desktop:min-h-[600px] desktop:p-[40px]
  `,

  exchangeSize: `
    w-[170px] min-h-[308px] p-[10px]
    tablet:w-[342px] tablet:min-h-[561px] tablet:p-[30px]
    desktop:w-[440px] desktop:min-h-[626px] desktop:p-[40px]
  `,

  image: `
    relative shrink-0
    w-[150px] h-[112px]
    tablet:w-[302px] tablet:h-[226.5px]
    desktop:w-[360px] desktop:h-[270px]
  `,

  title: `
    mt-[10px]
    truncate
    text-[14px] font-bold text-white
    tablet:mt-[25px] tablet:text-[22px]
  `,

  metaWrap: `
    mt-[5px]
    border-b border-gray-400
    pb-[10px]
    tablet:mt-[10px] tablet:pb-[25px]
  `,

  metaInner: `
    flex flex-col gap-[4px]
    tablet:flex-row tablet:items-center
  `,

  gradeLine: `
    flex items-center min-w-0
  `,

  divider: `
    mx-[6px] h-[10px] w-[1px] shrink-0 bg-gray-400
    tablet:mx-[10px] tablet:h-[14px]
  `,

  genre: `
    text-[10px] text-gray-300
    tablet:text-[16px]
  `,

  nickname: `
    text-[10px] text-white underline whitespace-nowrap
    tablet:ml-auto tablet:text-[16px]
  `,

  infoArea: `
    mt-[12px] space-y-[10px]
    text-[10px]
    tablet:mt-[20px] tablet:text-[18px]
  `,

  infoRow: `
    flex justify-between gap-[10px]
  `,

  infoLabel: `
    text-gray-300
  `,

  infoValue: `
    whitespace-nowrap text-white
  `,

  logoWrap: `
    relative mx-auto mt-auto
    h-[14px] w-[78px]
    tablet:h-[18px] tablet:w-[100px]
  `,

  description: `
    mt-[12px]
    line-clamp-2
    text-[10px] text-gray-200
    tablet:mt-[20px] tablet:text-[16px]
  `,

  purchaseTextDesktop: `
    hidden text-gray-300
    tablet:inline
  `,

  purchaseTextMobile: `
    block text-[10px] text-gray-300
    tablet:hidden
  `,

  buttonArea: `
    mt-auto flex gap-[5px]
    tablet:gap-[10px]
  `,
};

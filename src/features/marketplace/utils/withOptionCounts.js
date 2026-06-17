export const withOptionCounts = (options, counts = {}) =>
  options.map((option) =>
    option.value
      ? {
          ...option,
          label: `${option.label} ${counts[option.value] ?? 0}`,
        }
      : option,
  );

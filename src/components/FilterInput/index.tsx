import { FilterAlt, ListAlt, Search } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";

type FilterKey = "name" | "contactInfo.values" | "addresses" | "category";

type FilterOption = {
  id: FilterKey;
  label: string;
};

const filters: FilterOption[] = [
  {
    id: "name",
    label: "Nome",
  },
  {
    id: "contactInfo.values",
    label: "Contato",
  },
  {
    id: "addresses",
    label: "Endereço",
  },
  {
    id: "category",
    label: "Categoria",
  },
];

type GroupBy = "name" | "category";

interface FilterInputProps {
  sx?: SxProps<Theme>;
  onChange?: (change: { term?: string; field?: string }) => void;
  onGroupBy?: (groupBy?: GroupBy) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  sx,
  onChange,
  onGroupBy,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [term, setTerm] = useState<string>();
  const [groupBy, setGroupBy] = useState<GroupBy>();
  const inputRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>();

  const handleSearch = useCallback(
    () => onChange?.({ term, field: selectedFilter }),
    [onChange, selectedFilter, term],
  );

  const handleGroupBy = useCallback(
    () => onGroupBy?.(groupBy),
    [onGroupBy, groupBy],
  );

  useEffect(() => {
    const timer = setTimeout(handleSearch, 1000);
    return () => clearTimeout(timer);
  }, [handleSearch]);

  useEffect(() => {
    setOpenGroup(false);
    handleGroupBy();
  }, [handleGroupBy]);

  useEffect(() => {
    if (selectedFilter) setGroupBy(undefined);
  }, [selectedFilter]);

  useEffect(() => {
    if (groupBy) {
      setTerm(undefined);
      setSelectedFilter(undefined);
    }
  }, [groupBy]);

  useEffect(() => {
    if (term) setGroupBy(undefined);
  }, [term]);

  const handleTermChange = (newTerm: string) => {
    const currentTerm = newTerm.trim();
    setTerm(currentTerm === "" ? undefined : currentTerm);
  };

  const getMask = (filter?: FilterKey) => {
    switch (filter) {
      case "contactInfo.values":
        return "(99) 9 9999-9999";
      default:
        return "";
    }
  };

  const EndAdornment = React.memo(() => (
    <>
      <IconButton
        size="small"
        color="primary"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Search />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        id="filter-button"
        aria-haspopup="listbox"
        aria-controls="filter-menu"
        onClick={() => setOpenFilter(true)}
      >
        <FilterAlt color="primary" />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        id="group-button"
        aria-haspopup="listbox"
        aria-controls="group-menu"
        onClick={() => setOpenGroup(true)}
      >
        <ListAlt color="primary" />
      </IconButton>
    </>
  ));

  return (
    <>
      <Grid container justifyContent={"flex-end"} sx={sx}>
        <Grid item ref={inputRef}>
          {!open ? (
            <Grid
              item
              sx={{
                mt: 2,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <EndAdornment />
            </Grid>
          ) : (
            <InputMask
              value={term ?? ""}
              maskPlaceholder={null}
              mask={getMask(selectedFilter)}
              onChange={(e) => handleTermChange(e.target.value)}
            >
              <TextField
                size="small"
                label="Pesquisar"
                variant="standard"
                type="text"
                placeholder="O que deseja buscar?"
                sx={{ width: 250 }}
                InputProps={{
                  sx: {
                    pl: 1,
                  },
                  endAdornment: <EndAdornment />,
                }}
              />
            </InputMask>
          )}
        </Grid>
      </Grid>
      <Menu
        open={openFilter}
        id="filter-menu"
        anchorEl={inputRef.current}
        onClose={() => setOpenFilter(false)}
        aria-expanded={openFilter ? "true" : undefined}
        MenuListProps={{
          "aria-labelledby": "filter-button",
          role: "listbox",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <em>Selecione</em>
        </MenuItem>
        {filters.map(({ id, label }) => (
          <MenuItem
            key={id}
            selected={selectedFilter === id}
            onClick={() =>
              setSelectedFilter((prev) => (prev !== id ? id : undefined))
            }
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        open={openGroup}
        id="group-menu"
        anchorEl={inputRef.current}
        onClose={() => setOpenGroup(false)}
        aria-expanded={openGroup ? "true" : undefined}
        MenuListProps={{
          "aria-labelledby": "group-button",
          role: "listbox",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <em>Agrupar por</em>
        </MenuItem>
        <MenuItem
          selected={groupBy === "name"}
          onClick={() => setGroupBy(groupBy === "name" ? undefined : "name")}
        >
          Nome
        </MenuItem>
        <MenuItem
          selected={groupBy === "category"}
          onClick={() =>
            setGroupBy(groupBy === "category" ? undefined : "category")
          }
        >
          Categoria
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterInput;

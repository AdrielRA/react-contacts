import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import { TextField } from "..";

export type Libraries = ("places" | "drawing" | "geometry" | "visualization")[];

interface AddressInputProps {
  onChange: (address?: string) => void;
}

const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>(
  ({ onChange }: AddressInputProps, ref) => {
    const [libraries] = useState<Libraries>(["places"]);
    const [autoComplete, setAutoComplete] =
      useState<google.maps.places.Autocomplete>();
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
      libraries,
    });

    const onLoad = (autocomplete: google.maps.places.Autocomplete) =>
      setAutoComplete(autocomplete);

    const onPlaceChanged = async () => {
      if (autoComplete) {
        const place = autoComplete.getPlace();
        onChange?.(place.formatted_address);
      }
    };

    return (
      <>
        {isLoaded && (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField
              inputRef={ref}
              fullWidth
              type="text"
              className="search-local"
              placeholder="Pesquisar endereço..."
            />
          </Autocomplete>
        )}
      </>
    );
  },
);

export default AddressInput;

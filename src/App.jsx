import React, { useEffect, useMemo } from "react";
import { useLocalStorage, useSearchParam } from "react-use";
import { CssBaseline, ThemeProvider, Container } from "@material-ui/core";
import theme from "./theme";
import Filter from "./Filter";
import Chart from "./Chart";
import Title from "./Title";
import Footer from "./Footer";

let didSeed = false

const App = () => {
  const seededData = useSearchParam('data')
  const [filters, onChange] = useLocalStorage("filters", []);
  if (!didSeed && seededData) {
    onChange(seededData.split(','))
    didSeed = true
  }

  const sanitizedInputFilters = useMemo(
    () =>
      Array.from({ length: 13 }).map((v, i) =>
        String(Number(filters[i]) || "")
      ),
    [filters]
  );

  const sanitizedFilters = useMemo(
    () => filters.map((v) => Number(v) || undefined),
    [filters]
  );

  useEffect(() => {
    if (!Array.isArray(filters)) {
      onChange([]);
    }
  }, [filters]);

  // Avoid errors
  if (!Array.isArray(filters)) return null;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Title />
          <Filter filters={sanitizedInputFilters} onChange={onChange} />
          <Chart filter={sanitizedFilters} />
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;

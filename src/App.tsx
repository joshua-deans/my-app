import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  IconButton,
  List,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { v4 } from "uuid";

function App() {
  const [currentValue, setCurrentValue] = React.useState("");
  const [list, setList] = React.useState<
    { id: string; date: Date; text: string }[]
  >([]);
  React.useEffect(() => {
    initializeIcons();
  }, []);

  const displayDateAsString = (date: Date | undefined) : string => {
    if (!date){
      return '';
    }
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    }
    return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString([], timeOptions)}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }} style={{ width: 450 }}>
          <img
            style={{ height: 128, width: 128 }}
            src={logo}
            className="App-logo"
            alt="logo"
          />
          <Text variant="xLarge" style={{ color: "white" }}>
            Josh's Test React App.
          </Text>
          <Stack horizontal horizontalAlign="center">
            <TextField
              placeholder="Enter New Value"
              value={currentValue}
              onChange={(ev, newValue) => setCurrentValue(newValue as string)}
              style={{ width: "100%" }}
            />
            <PrimaryButton
              text="Submit"
              onClick={() => {
                if (currentValue !== "") {
                  setList([
                    ...list,
                    { text: currentValue, date: new Date(), id: v4() },
                  ]);
                  setCurrentValue("");
                }
              }}
            />
          </Stack>
          <List
            items={list}
            onRenderCell={(item, index) => {
              return (
                <Stack
                  horizontal
                  horizontalAlign="space-between"
                  verticalAlign="center"
                  style={{ borderBottom: "1px solid white", padding: "8px 0" }}
                >
                  <Stack horizontalAlign="start">
                    <Text style={{ color: "white" }}>{item?.text}</Text>
                    <Text variant="small" style={{ color: "white" }}>
                      {displayDateAsString(item?.date)}
                    </Text>
                  </Stack>
                  <IconButton
                    style={{ color: "red" }}
                    iconProps={{ iconName: "Delete" }}
                    onClick={() => {
                      const id = item?.id;
                      setList(list.filter((t) => t.id !== id));
                    }}
                  />
                </Stack>
              );
            }}
          />
        </Stack>
      </header>
    </div>
  );
}

export default App;

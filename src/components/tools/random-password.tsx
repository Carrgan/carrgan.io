import React, { useMemo, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import { Button, LinearProgress, Slider, useColorScheme } from "@mui/joy";
import Style from "./random-password.module.scss";
import NumberInput from "@site/src/components/common/number-input";
import ChoiceChips, { IChoiceChipsItem } from "@site/src/components/common/choice-chips";
import { getPassword } from "@site/src/components/tools/random-password-helper";

const PASSWORD_MIN_LENGTH = 1;
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_DEFAULT_LENGTH = 32;
const DEFAULT_CHARACTER_CONFIG = [
  {
    title: "Number",
    value: "number"
  },
  {
    title: "Uppercase",
    value: "uppercase"
  },
  {
    title: "Lowercase",
    value: "lowercase"
  },
  {
    title: "Symbol",
    value: "symbol"
  }
];

const RandomPassword = () => {
  const [passwordLength, setPasswordLength] = useState<number>(PASSWORD_DEFAULT_LENGTH);
  const [characterConfig, setCharacterConfig] =
    useState<IChoiceChipsItem[]>(DEFAULT_CHARACTER_CONFIG);
  // const [seed, setSeed] = useState<string>();

  // const handleSeedChange = (value: string) => {
  //   setSeed(value);
  // };

  const [password, setPassword] = useState<string>(
    getPassword(
      (DEFAULT_CHARACTER_CONFIG as IChoiceChipsItem[]).map(i => i.value),
      passwordLength
    )
  );

  const handleGeneratePasswordClick = () => {
    setPassword(
      getPassword(
        characterConfig.map(i => i.value),
        passwordLength
      )
    );
  };

  const handleLengthChange = (value: number) => {
    setPasswordLength(value);
    const newPassword = getPassword(
      characterConfig.map(i => i.value),
      value
    );
    setPassword(newPassword);
  };

  const handleCharacterConfigChange = (value: IChoiceChipsItem[]) => {
    if (value.length === 0) return;
    setCharacterConfig(value);
    const newPassword = getPassword(
      value.map(i => i.value),
      passwordLength
    );
    setPassword(newPassword);
  };
  const passwordStranger = useMemo(
    () => passwordLength * characterConfig.length,
    [passwordLength, characterConfig]
  );
  return (
    <div>
      {/*<div style={{ paddingBottom: 16 }}>*/}
      {/*  <Input*/}
      {/*    value={seed}*/}
      {/*    size={"lg"}*/}
      {/*    startDecorator={"Seed:"}*/}
      {/*    onChange={e => handleSeedChange(e.target.value)}*/}
      {/*  />*/}
      {/*</div>*/}
      <CodeBlock className={Style.codeBlock}>{password}</CodeBlock>
      <LinearProgress
        style={{
          color: passwordStranger < 25 ? "#77061a" : passwordStranger < 100 ? "#d4a82d" : "#0d5e25"
        }}
        determinate
        value={passwordStranger > 100 ? 100 : passwordStranger}
      />
      <div className={Style.lengthInput}>
        <Slider
          value={passwordLength}
          onChange={(e, v) => handleLengthChange(v as number)}
          valueLabelDisplay={"auto"}
          max={PASSWORD_MAX_LENGTH}
          min={PASSWORD_MIN_LENGTH}
          className={Style.slider}
          size="lg"
        />
        <NumberInput
          value={passwordLength}
          onChange={handleLengthChange}
          min={PASSWORD_MIN_LENGTH}
          max={PASSWORD_MAX_LENGTH}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16 }}>
        <div>
          <ChoiceChips
            onChange={handleCharacterConfigChange}
            items={DEFAULT_CHARACTER_CONFIG}
            selectedItems={characterConfig}
          />
        </div>
        <div>
          <Button onClick={handleGeneratePasswordClick}>Refresh</Button>
        </div>
      </div>
    </div>
  );
};

export default RandomPassword;

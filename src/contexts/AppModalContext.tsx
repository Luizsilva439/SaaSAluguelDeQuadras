import React, { createContext, useContext, useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { colors } from "../constants/colors";

type AppModalButton = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

type ShowModalPayload = {
  title: string;
  message?: string;
  buttons?: AppModalButton[];
};

type AppModalContextType = {
  showModal: (payload: ShowModalPayload) => void;
  hideModal: () => void;
};

const AppModalContext = createContext<AppModalContextType>({
  showModal: () => undefined,
  hideModal: () => undefined,
});

export function useAppModal() {
  return useContext(AppModalContext);
}

export function AppModalProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState<AppModalButton[]>([]);

  function hideModal() {
    setVisible(false);
  }

  function showModal(payload: ShowModalPayload) {
    setTitle(payload.title);
    setMessage(payload.message || "");
    setButtons(payload.buttons?.length ? payload.buttons : [{ text: "OK" }]);
    setVisible(true);
  }

  const value = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    []
  );

  return (
    <AppModalContext.Provider value={value}>
      {children}

      <Modal transparent visible={visible} animationType="fade" onRequestClose={hideModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.55)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 360,
              backgroundColor: colors.secondary,
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: "#2a5b4d",
            }}
          >
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>{title}</Text>

            {!!message && (
              <Text style={{ color: colors.gray, fontSize: 14, marginTop: 10, lineHeight: 20 }}>
                {message}
              </Text>
            )}

            <View style={{ marginTop: 18, gap: 10 }}>
              {buttons.map((button, index) => {
                const isDestructive = button.style === "destructive";
                const isCancel = button.style === "cancel";

                return (
                  <Pressable
                    key={`${button.text}-${index}`}
                    style={{
                      backgroundColor: isCancel
                        ? "transparent"
                        : isDestructive
                        ? "rgba(255,82,82,0.18)"
                        : colors.primary,
                      borderWidth: 1,
                      borderColor: isCancel
                        ? "#2a5b4d"
                        : isDestructive
                        ? "rgba(255,82,82,0.35)"
                        : colors.primary,
                      borderRadius: 12,
                      height: 46,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      hideModal();
                      button.onPress?.();
                    }}
                  >
                    <Text
                      style={{
                        color: isCancel ? colors.text : isDestructive ? "#ff7f7f" : colors.background,
                        fontWeight: "800",
                        fontSize: 14,
                      }}
                    >
                      {button.text}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </AppModalContext.Provider>
  );
}

const element = window.document.createElement('a');
document.body.appendChild(element);

export function downloadJson(raw: any): void {
  const filename = `${Date.now()}.json`;
  const blob = new Blob([JSON.stringify(raw, null, 2)], {
    type: "application/json",
  });

  element.href = window.URL.createObjectURL(blob);
  element.download = filename;
  element.click();
}
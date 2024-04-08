import Swal from "sweetalert2";

export function showAlert(title, text, icon = "info") {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: "Entendido",
    });
}

export function showSuccessAlert(message) {
    return showAlert("Éxito", message, "success");
}

export function showErrorAlert(message) {
    return showAlert("Error", message, "error");
}

export function showWarningAlert(message) {
    return showAlert("Advertencia", message, "warning");
}

export function showInfoAlert(message) {
    return showAlert("Información", message, "info");
}

export function showConfirmation(title, text) {
    return Swal.fire({
        title,
        text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar"
    });
}
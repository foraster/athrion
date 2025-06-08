import { makeAutoObservable } from "mobx";

export default class CartStore {
  products = [];

  loadFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.products = parsed;
      } catch (e) {
        console.error("Fehler beim Laden der Warenkorb-Daten:", e);
      }
    }
  }  

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  constructor() {
    this.loadFromStorage();
    makeAutoObservable(this);
  }

  setProducts(products) {
    this.products = products;
    this.saveToStorage();
  }

  setQuantity(id, quantity) {
  const item = this.products.find(p => p.id === id);
  if (item) {
    item.quantity = quantity;
    this.saveToStorage();
  }
}

  addProduct(product) {
    const existing = this.products.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.products.push({ ...product, quantity: 1 });
    }
    this.saveToStorage();
  }

  decreaseProduct(id) {
    const item = this.products.find(p => p.id === id);
    if (item) {
      if (item.quantity <= 1) {
        return;
      } 
      item.quantity -= 1;
      this.saveToStorage();
      
    }
  }
  
  increaseProduct(id) {
    const item = this.products.find(p => p.id === id);
    if (item) {
      if (item.quantity >= 99) {
        return;
      } 
      item.quantity += 1;
      this.saveToStorage();
    }
  }

  removeProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToStorage();
  }

  clear() {
    this.products = [];
    this.saveToStorage();
  }

  get totalPriceCents() {
    return this.products.reduce((sum, p) => sum + p.price_cents * p.quantity, 0);
  }
}

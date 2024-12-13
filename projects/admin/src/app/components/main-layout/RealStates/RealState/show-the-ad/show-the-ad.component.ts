import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-the-ad',
  standalone: true,
  imports: [NgClass],
  templateUrl: './show-the-ad.component.html',
  styleUrl: './show-the-ad.component.scss'
})
export class ShowTheAdComponent {
  product = {
    name: 'Wireless Bluetooth Headphones',
    price: 150,
    discountedPrice: 120,
    rating: 4.5,
    reviews: 1240,
    images: [
      'assets/images/product1.jpg',
      'assets/images/product2.jpg',
      'assets/images/product3.jpg'
    ],
    description: 'Experience the best sound quality with our premium wireless headphones.',
    features: [
      'High-quality sound',
      'Noise cancellation technology',
      'Comfortable ear cushions',
      'Long battery life'
    ]
  };

  selectedImage: string = this.product.images[0];

  selectImage(image: string) {
    this.selectedImage = image;
  }
}

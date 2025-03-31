// import { Request, Response } from 'express';
// import { CategoryService } from '../services/categoryService';
// import { Category } from '../models/Category';

// const categoryService = new CategoryService();

// export class CategoryController {
  

//     async createCategory(req: Request, res: Response){
//     const categoryData: Partial<Category> = req.body;
//     try {
//         const category = await categoryService.createcategory(categoryData);
//         res.status(201).json({ message: "category created successfully!", data: category });
//     } catch (error) {
//         res.status(500).json({ error: "Error creating category" });
//     }
//     }

//   async getCategoryById(req: Request, res: Response){
//     const categoryId = Number(req.params.id);
//     try {
//       const category = await categoryService.getCategoryById(categoryId);
//       res.status(200).json({ data: category });
//     } catch (error) {
//       res.status(404).json({ message: (error as Error).message });
//     }
//   }

//   async updateCategory(req: Request, res: Response){
//     const categoryId = Number(req.params.id);
//     const data = req.body;
//     try {
//       const updatedCategory = await categoryService.updateCategoryById(categoryId, data);
//       res.status(200).json({message:"Category updated successfully", data: updatedCategory });
//     } catch (error) {
//       res.status(404).json({ message: (error as Error).message });
//     }
//   }

//   async deleteCategory(req: Request, res: Response){
//     const categoryId = Number(req.params.id);
//     try {
//       await categoryService.deleteCategory(categoryId);
//       res.status(200).json({ message: "Category deleted successfully!" });
//     } catch (error) {
//       res.status(404).json({ message: (error as Error).message });
//     }
//   }

//   async getAllCategories(req: Request, res: Response){
//     try {
//       const categories = await categoryService.getAllCategories();
//       res.status(200).json(categories);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching categories" });
//     }
//   }
// }
//Environments
import { environment } from 'src/environments/environment';

export class ApiEndpointHelper {
  static get(path: string): string {
    return `${environment.apiUrl}${path}`;
  }
}

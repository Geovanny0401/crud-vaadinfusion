import { Binder, field } from "@vaadin/form";
import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
} from "lit-element";
import Estudiante from "../../generated/com/example/application/data/entity/Estudiante";
import EstudianteModel from "../../generated/com/example/application/data/entity/EstudianteModel";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import { deleteEstudiante, getEstudiantes, saveEstudiante } from "../../generated/EstudianteEndpoint";

@customElement("estudiante-view")
export class EstudianteView extends LitElement {
  @internalProperty()
  private estudiantes: Estudiante[] = [];

  @internalProperty()
  private message = "";

  private binder = new Binder(this, EstudianteModel);

  static get styles() {
    return css`
      :host {
        display: block;
        padding:var(--lumo-space-l);
      }
    `;
  }

  render() {
    const { model } = this.binder;
    return html`<h1>Cliente</h1>
    <div class="message">${this.message}</div>
    <ul>
      ${this.estudiantes.map(
       (person) => html`<li>${person.nombre} ${person.apellido}
       <vaadin-button @click=${() => this.clear(person.id)}>
           <iron-icon icon="lumo:minus" slot="prefix"></iron-icon>
                Delete
       </vaadin-button
       </li>`
   )}    
   </ul>
    <h2>Nuevo Cliente</h2>
<div class="form"><vaadin-text-field
label="Nombre"
     ...=${field(model.nombre)}
 ></vaadin-text-field>
<vaadin-text-field
label="Apellidos"
   ...=${field(model.apellido)}
></vaadin-text-field>
<vaadin-button @click=${this.add}>
<iron-icon icon="lumo:plus" slot="prefix"></iron-icon>Add
    </vaadin-button>
    </div>`;
  }
  async add() {
    const saved = await this.binder.submitTo(saveEstudiante);
    if (saved) {
      this.estudiantes = [...this.estudiantes, saved];
      this.binder.clear();
    }
  }

  async firstUpdated() {
    this.estudiantes = await getEstudiantes();
  }

  async clear(id: any) {
    await deleteEstudiante(id);
    this.estudiantes = this.estudiantes.filter((t) => t.id !== id);
  }
}
